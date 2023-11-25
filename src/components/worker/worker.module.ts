import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerGateway } from './worker.gateway';
import { Worker } from './entities/worker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { WorkerController } from './worker.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Worker, User])
    ],
    providers: [
        WorkerGateway,
        WorkerService,
        UserService
    ],
    controllers: [WorkerController],
    exports: [WorkerService]
})
export class WorkerModule { }
