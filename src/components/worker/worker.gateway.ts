import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody, WsResponse, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { IWorkerInfo, WorkerService } from './worker.service';
import { ConnectableObservable, from, map, Observable } from 'rxjs';
import { Worker } from './entities/worker.entity';

@WebSocketGateway(80, {
    namespace: 'worker',
    cors: {
        origin: '*',
    },
})
export class WorkerGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Server;

    constructor(
        private readonly workerService: WorkerService
    ) { }

    handleConnection(socket: Socket): void {
        this.workerService.handleConnection(socket);
    }

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        console.log(data)
        return data;
    }

    @SubscribeMessage('registerWorker')
    async registerWorker(@ConnectedSocket() client: Socket, @MessageBody() workerInfo: IWorkerInfo): Promise<Worker> {
        let workerSaved = await this.workerService.registerWorker(client.id, workerInfo);
        console.log(`Registered worker as workerId: ${workerSaved.id};`);
        return workerSaved;
    }
}