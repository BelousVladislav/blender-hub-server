import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    tags: string;
    @ApiProperty()
    uuidToken: string;
}
