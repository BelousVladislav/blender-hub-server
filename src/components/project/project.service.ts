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

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        private renderService: RenderService,
        private workerService: WorkerService
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        console.log(createProjectDto)
        let project = await this.projectRepository.create(createProjectDto);
        return await this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({ relations: { user: true, renders: true } });
    }

    async findById(id: number): Promise<Project | undefined> {
        return await this.projectRepository.findOne({ where: { id: id }, relations: { user: true, renders: true } });
    }

    async findOneBy(data: any): Promise<Project> {
        return await this.projectRepository.findOne({ where: data, relations: { user: true, renders: true } });
    }

    async findMoreBy(data: any): Promise<Project[]> {
        return (await this.projectRepository.find({ where: data, relations: { user: true, renders: true } }));
    }

    async update(updateProjectDto: UpdateProjectDto): Promise<Project> {
        return await this.projectRepository.save(updateProjectDto, { reload: true });
    }

    async remove(id: number) {
        await this.projectRepository.delete(id);
    }

    async uploadBlenderFileForRender(projectId: number, file: any) {
        let { workerId, socket } = await this.workerService.getFreeWorker();
        if (!socket)
            throw new HttpException('Немає воркерів онлайн! Спробуйте пізніше.', HttpStatus.BAD_REQUEST)
        let fileUUID = uuidv4();
        let fileFormat = file.originalname.substring(file.originalname.indexOf('.'));
        console.log(file);
        fs.writeFileSync(`./upload/${fileUUID}${fileFormat}`, file.buffer);
        let newRender = new Render();
        newRender.projectId = projectId;
        newRender.inFileOriginalName = file.originalname;
        newRender.inFileUUIDName = fileUUID + fileFormat;
        newRender.inFilePath = `./upload/${fileUUID}${fileFormat}`;
        newRender.statusId = 1;
        newRender.progress = 0;
        newRender.workerId = workerId;
        newRender.statusId = 2;
        let render = await this.renderService.create(newRender);
        await this.workerService.sendRenderIdToWorker(socket, render.id);
        return render;
    }
}
