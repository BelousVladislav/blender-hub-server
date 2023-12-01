
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Render } from '../../render/entities/render.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
@Entity({ name: 'projects' })
export class Project extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Column('nvarchar', { length: 150, nullable: false })
    name: string;

    @ApiProperty()
    @ManyToOne(() => User, (user) => user.projects)
    user: User;

    @ApiProperty()
    @Column('int', { nullable: false })
    userId: string;

    @ApiProperty()
    @Column('nvarchar', { length: 2000 })
    description: string;

    @ApiProperty()
    @Column('nvarchar', { length: 2000 })
    tags: string;

    @ApiProperty()
    @Column('varchar')
    uuidToken: string;

    @ApiProperty()
    @OneToMany(() => Render, (render) => render.project)
    renders: Render[];

    @ApiProperty()
    @OneToMany(() => Comment, (comment) => comment.project)
    comments: Comment[];

    @ApiProperty()
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
