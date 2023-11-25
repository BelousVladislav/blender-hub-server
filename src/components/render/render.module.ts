import { Module } from '@nestjs/common';
import { RenderService } from './render.service';
import { RenderController } from './render.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Render } from './entities/render.entity';
import { Project } from '../project/entities/project.entity';
import { Status } from '../status/entities/status.entity';
import { User } from '../user/entities/user.entity';
import { Worker } from '../worker/entities/worker.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Render, Project, User, Status, Worker])
    ],
    controllers: [RenderController],
    providers: [RenderService],
})
export class RenderModule { }
