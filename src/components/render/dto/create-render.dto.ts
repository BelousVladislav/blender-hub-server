import { ApiProperty } from '@nestjs/swagger';

export class CreateRenderDto {
    @ApiProperty()
    projectId: number;
    @ApiProperty()
    inFileOriginalName: string;
    @ApiProperty()
    inFileUUIDName: string;
    @ApiProperty()
    inFilePath: string;
    @ApiProperty()
    statusId: number;
    @ApiProperty()
    progress: number;
    @ApiProperty()
    workerId: string;
}
