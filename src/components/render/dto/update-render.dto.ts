import { PartialType } from '@nestjs/mapped-types';
import { CreateRenderDto } from './create-render.dto';

export class UpdateRenderDto extends PartialType(CreateRenderDto) {
    id: number;
    outFileOriginalName: string;
    outFileUUIDName: string;
    outFilePath: string;
    message: string;
}
