import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    blenderVersion: number;
    @ApiProperty()
    os: string;
    @ApiProperty()
    gpuName: string;
    @ApiProperty()
    donate: string;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    isOnline: boolean;
    @ApiProperty()
    currSocketId: string;
}