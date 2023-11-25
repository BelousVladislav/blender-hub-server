import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Worker } from './entities/worker.entity';
import { Repository, DataSource } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

export interface IWorkerInfo {
    workerid: string;
    workeruuid: string;
    donate: string;
    blenderVersion: number;
    os: string;
    gpuName: string;
}

@Injectable()
export class WorkerService {
    private connectedClients: Map<string, Socket> = new Map();

    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(Worker) private workerRepository: Repository<Worker>,
        private userService: UserService
    ) {

    }
    handleConnection(socket: Socket): void {
        const clientId = socket.id;
        this.connectedClients.set(clientId, socket);
        console.log(clientId + ' connected')

        socket.on('disconnect', async () => {
            await this.disconnect(clientId)
            console.log(clientId, 'disconnected');
        });
    }

    async create(createWorkerDto: CreateWorkerDto) {
        let workerExist = await this.workerRepository.exist({ where: { id: createWorkerDto.id } });
        if (workerExist) throw new Error('Worker з таким id вже існує');
        let worker = this.workerRepository.create({ ...createWorkerDto as any });
        return await this.workerRepository.save(worker);
    }

    async findAll(): Promise<Worker[]> {
        return await this.workerRepository.find({ relations: { user: true } });
    }

    async findById(id: string): Promise<Worker | undefined> {
        return await this.workerRepository.findOne({ where: { id: id }, relations: { user: true } });
    }

    async findOneBy(data: any): Promise<Worker | undefined> {
        return await this.workerRepository.findOne({ where: data, relations: { user: true } });
    }

    async findMoreBy(data: any): Promise<Worker[]> {
        return (await this.workerRepository.find({ where: data, relations: { user: true } }));
    }

    async update(updateWorkerDto: UpdateWorkerDto) {
        // return this.workerRepository.save({ ...updateWorkerDto as any }, { reload: true });
        return await this.workerRepository.createQueryBuilder()
            .update()
            .set(updateWorkerDto)
            .where("id = :id", { id: updateWorkerDto.id })
            .execute();
    }

    async disconnect(socketId: string) {
        this.connectedClients.delete(socketId);
        let disconnWorker = await this.findOneBy({ currSocketId: socketId });
        disconnWorker.isOnline = false;
        disconnWorker.currSocketId = null;
        await this.update(disconnWorker);
    }

    async registerWorker(socketId: string, workerInfo: IWorkerInfo) {
        let isWorkerExists = await this.workerRepository.exist({ where: { id: workerInfo.workerid } });
        let user = await this.userService.findOneBy({ worker_uuid: workerInfo.workeruuid });
        let workerDto: CreateWorkerDto = {
            id: workerInfo.workerid,
            blenderVersion: workerInfo.blenderVersion,
            os: workerInfo.os,
            gpuName: workerInfo.gpuName,
            donate: workerInfo.donate,
            userId: user.id,
            isOnline: true,
            currSocketId: socketId,
        }
        if (isWorkerExists) {
            await this.update(workerDto)
        } else {
            let newWorker = this.workerRepository.create(workerDto);
            await this.workerRepository.save(newWorker);
        }
        return await this.findById(workerInfo.workerid);
    }

    async getFreeWorker(): Promise<{ workerId: string, socket: string }> {
        let result = await this.dataSource.query(
            `with workerFree as (
                select top 1
                    w.id,
                    count(r.workerId) cnt
                from
                    workers w
                    left join renders r on w.id = r.workerId and r.statusId = 2
                where
                    w.isOnline = 1
                group by
                    w.id
                order by count(r.workerId) asc
            )
            select id, currSocketId soket from workers where id = (select id from workerFree)`
        )
        return { workerId: result[0]?.id, socket: result[0]?.soket }
    }

    async sendRenderIdToWorker(socket: string, renderId: number) {
        let sck = this.connectedClients.get(socket);
        sck.emit('sendRenderIdToWorker', renderId);
    }
}