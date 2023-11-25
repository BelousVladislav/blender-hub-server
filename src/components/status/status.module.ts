import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Render } from '../render/entities/render.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Status, Render])
    ],
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule { }
