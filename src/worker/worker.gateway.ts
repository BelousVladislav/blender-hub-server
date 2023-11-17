import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody, WsResponse, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { WorkerService } from './worker.service';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway(80, {
    namespace: 'worker',
    cors: {
        origin: '*',
    },
})
export class WorkerGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Server;

    constructor(private readonly workerService: WorkerService) { }

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

    @SubscribeMessage('blenderInfo')
    async blenderInfo(@ConnectedSocket() client: Socket, @MessageBody() data: number): Promise<number> {
        console.log(client.id, data);
        return data;
    }
}