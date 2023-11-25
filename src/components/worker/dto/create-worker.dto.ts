export class CreateWorkerDto {
    id: string
    blenderVersion: number;
    os: string;
    gpuName: string;
    donate: string;
    userId: number;
    isOnline: boolean;
    currSocketId: string;
}