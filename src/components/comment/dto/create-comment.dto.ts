import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    description: string;
    @ApiProperty()
    projectId: number;
    @ApiProperty()
    userId: string;
}
