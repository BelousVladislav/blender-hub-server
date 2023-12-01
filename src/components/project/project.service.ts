import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { RenderService } from '../render/render.service';
import { WorkerService } from '../worker/worker.service';
import { Render } from '../render/entities/render.entity';
import { CommentService } from '../comment/comment.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        private renderService: RenderService,
        private commentService: CommentService,
        private workerService: WorkerService
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        createProjectDto.uuidToken = await bcrypt.hash(createProjectDto.uuidToken, 10);
        let project = await this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({ relations: { user: true, renders: true, comments: true }, order: { id: 'DESC' } });
    }

    async findById(id: number): Promise<Project | undefined> {
        return await this.projectRepository.findOne({ where: { id: id }, relations: { user: true, renders: true, comments: true } });
    }

    async findOneBy(data: any): Promise<Project> {
        return await this.projectRepository.findOne({ where: data, relations: { user: true, renders: true, comments: true } });
    }

    async findMoreBy(data: any): Promise<Project[]> {
        return (await this.projectRepository.find({ where: data, relations: { user: true, renders: true, comments: true }, order: { id: 'DESC' } }));
    }

    async update(updateProjectDto: UpdateProjectDto): Promise<Project> {
        if (updateProjectDto.uuidToken)
            updateProjectDto.uuidToken = await bcrypt.hash(updateProjectDto.uuidToken, 10);
        return await this.projectRepository.save(updateProjectDto, { reload: true });
    }

    async remove(id: number) {
        let project = await this.findById(id);
        for (let i = 0; i < project.renders.length; i++) {
            await this.renderService.remove(project.renders[i].id);
        }
        for (let i = 0; i < project.comments.length; i++) {
            await this.commentService.remove(project.comments[i].id);
        }
        await this.projectRepository.delete(id);
    }

    async uploadBlenderFileForRender(projectId: number, file: any) {
        let { workerId, socket } = await this.workerService.getFreeWorker();
        if (!socket)
            throw new HttpException('Немає воркерів онлайн! Спробуйте пізніше.', HttpStatus.BAD_REQUEST)
        let fileUUID = uuidv4();
        let fileFormat = file.originalname.substring(file.originalname.lastIndexOf('.'));
        fs.writeFileSync(`./upload/${fileUUID}${fileFormat}`, file.buffer);
        let newRender = new Render();
        newRender.projectId = projectId;
        newRender.inFileOriginalName = file.originalname;
        newRender.inFileUUIDName = fileUUID + fileFormat;
        newRender.inFilePath = `./upload/${fileUUID}${fileFormat}`;
        newRender.statusId = 1;
        newRender.progress = 0;
        newRender.workerId = workerId;
        let render = await this.renderService.create(newRender);
        await this.workerService.sendRenderIdToWorker(socket, render.id);
        return render;
    }

    async uploadFileFromBlender(projectId: number, uuidToken: string, file: any) {
        let project = await this.findById(projectId);
        if (!project)
            return new HttpException('Project Not Found', HttpStatus.NOT_FOUND);
        if (await bcrypt.compare(uuidToken, project.uuidToken)) {
            console.log(projectId)
            console.log(uuidToken)
            console.log(file);
            return this.uploadBlenderFileForRender(projectId, file);
        } else {
            console.log('NO')
        }
    }
}
