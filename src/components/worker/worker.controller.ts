
import { Controller, Request, Post, UseGuards, Get, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { WorkerService } from './worker.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('worker')
@Controller('worker')
export class WorkerController {
    constructor(private workerService: WorkerService) { }

    @Get()
    findAll(@Request() req) {
        return this.workerService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('findMy')
    findMy(@Request() req) {
        return this.workerService.findMoreBy({ userId: req.user.payload.user.id });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.workerService.findOneBy({ id: id })
    }



}