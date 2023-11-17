import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WorkerService {
    private readonly connectedClients: Map<string, Socket> = new Map();

    handleConnection(socket: Socket): void {
        const clientId = socket.id;
        this.connectedClients.set(clientId, socket);
        console.log(clientId + 'connected')

        socket.on('disconnect', () => {
            console.log(clientId, 'discon')
            this.connectedClients.delete(clientId);
        });

        // Handle other events and messages from the client
    }

    // Add more methods for handling events, messages, etc.
}