import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerGateway } from './worker.gateway';

@Module({
    providers: [
        WorkerGateway,
        WorkerService
    ],
})
export class WorkerModule { }
