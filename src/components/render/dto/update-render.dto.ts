import { PartialType } from '@nestjs/mapped-types';
import { CreateRenderDto } from './create-render.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRenderDto extends PartialType(CreateRenderDto) {
    @ApiProperty()
    id: number;
    @ApiProperty()
    outFileOriginalName: string;
    @ApiProperty()
    outFileUUIDName: string;
    @ApiProperty()
    outFilePath: string;
    @ApiProperty()
    message: string;
}
