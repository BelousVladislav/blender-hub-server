import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
        createProjectDto.userId = req.user.payload.user.id;
        return this.projectService.create(createProjectDto);
    }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('findMy')
    findMyMore(@Request() req) {
        return this.projectService.findMoreBy({ userId: req.user.payload.user.id });
    }

    @Get('findByUserId/:userId')
    findMoreBy(@Param('userId') userId: string) {
        return this.projectService.findMoreBy({ userId: userId });
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.projectService.findById(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(updateProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('uploadBlenderFileForRender/:projectId')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('projectId') projectId: string
    ) {
        return this.projectService.uploadBlenderFileForRender(+projectId, file)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectService.remove(+id);
    }


}
