import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Render } from '../render/entities/render.entity';
import { RenderService } from '../render/render.service';
import { WorkerService } from '../worker/worker.service';
import { Worker } from '../worker/entities/worker.entity';
import { UserService } from '../user/user.service';
import { WorkerModule } from '../worker/worker.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, User, Render]),
        WorkerModule
    ],
    controllers: [ProjectController],
    providers: [ProjectService, RenderService, UserService],
})
export class ProjectModule { }
