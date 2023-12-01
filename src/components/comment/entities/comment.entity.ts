
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Project } from '../../project/entities/project.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ "message": "description field cannot be empty" })
    @Column('nvarchar', { length: 2000, nullable: false })
    description: string;

    @ManyToOne(() => Project, (project) => project.comments, { onDelete: 'CASCADE' })
    project: Project;

    @Column('int', { nullable: false })
    projectId: number;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @Column('int', { nullable: false })
    userId: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
