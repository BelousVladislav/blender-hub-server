import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Request, Res, StreamableFile, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { RenderService } from './render.service';
import { CreateRenderDto } from './dto/create-render.dto';
import { UpdateRenderDto } from './dto/update-render.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('render')
@Controller('render')
export class RenderController {
    constructor(private readonly renderService: RenderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createRenderDto: CreateRenderDto) {
        return this.renderService.create(createRenderDto);
    }

    @Get()
    findAll() {
        return this.renderService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.renderService.findById(+id);
    }

    @Get('findByProjectId/:projectId')
    findMoreBy(@Param('projectId') projectId: string) {
        return this.renderService.findMoreBy({ projectId: projectId });
    }

    @Get('file/:fileName')
    getFileByName(@Res() res: Response, @Param('fileName') fileName: string) {
        const file = fs.createReadStream(join(process.cwd(), 'upload', fileName))
        file.pipe(res)
        // return new StreamableFile(file);
    }

    @Get('donwloadFile/:fileName')
    donwloadFile(@Res() res: Response, @Param('fileName') fileName: string) {
        let file: fs.ReadStream;
        if (fs.existsSync(join(process.cwd(), 'upload', fileName))) {
            file = fs.createReadStream(join(process.cwd(), 'upload', fileName))//.pipe(res);
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename=${fileName}`,
            });
            file.pipe(res)
        } else if (fs.existsSync(join(process.cwd(), 'rendered', fileName))) {
            file = fs.createReadStream(join(process.cwd(), 'rendered', fileName))
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename=${fileName}`,
            });
            file.pipe(res)
        } else {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Body() updateRenderDto: UpdateRenderDto) {
        return this.renderService.update(updateRenderDto);
    }

    @Patch('updateProgress')
    updateProgress(@Body() data: { renderId: number, progress: number }) {
        return this.renderService.updateRenderProgress(data.renderId, data.progress)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.renderService.remove(+id);
    }

    @Post('uploadRenderedFileFromWorker/:renderId')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('renderId') renderId: string
    ) {
        return this.renderService.uploadRenderedFileFromWorker(+renderId, file)
    }


}
