
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Render } from '../../render/entities/render.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ "message": "Name field cannot be empty" })
    @Column('nvarchar', { length: 150, nullable: false })
    name: string;

    @ManyToOne(() => User, (user) => user.projects)
    user: User;

    @Column('int', { nullable: false })
    userId: string;

    @Column('nvarchar', { length: 2000 })
    description: string;

    @Column('nvarchar', { length: 2000 })
    tags: string;

    @Column({ generated: 'uuid' })
    project_uuid: string;

    @OneToMany(() => Render, (render) => render.project)
    renders: Render[];

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
