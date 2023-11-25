
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, BeforeInsert, Generated, OneToMany, ManyToOne } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Worker } from '../../worker/entities/worker.entity';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'renders' })
export class Render extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.renders)
    project: Project;

    @IsNotEmpty({ "message": "projectId field cannot be empty" })
    @Column('int', { nullable: false })
    projectId: number;

    // @ManyToOne(() => User, (user) => user.renders)
    // user: User;

    // @IsNotEmpty({ "message": "userId field cannot be empty" })
    // @Column('int', { nullable: false })
    // userId: number;

    @IsNotEmpty({ "message": "inFileOriginalName field cannot be empty" })
    @Column('varchar', { length: 300, nullable: false })
    inFileOriginalName: string;

    @IsNotEmpty({ "message": "inFileUUIDName field cannot be empty" })
    @Column('varchar', { length: 300, nullable: false, unique: true })
    inFileUUIDName: string;

    @IsNotEmpty({ "message": "inFilePath field cannot be empty" })
    @Column('varchar', { length: 300, nullable: false, unique: false })
    inFilePath: string;

    @ManyToOne(() => Status, (status) => status.renders)
    status: Status;

    @IsNotEmpty({ "message": "statusId field cannot be empty" })
    @Column('int', { nullable: false })
    statusId: number;

    @ManyToOne(() => Worker, (worker) => worker.renders)
    worker: Worker;

    @Column('varchar', { nullable: true })
    workerId: string;

    @Column('int', { nullable: false })
    @IsNotEmpty({ "message": "progress field cannot be empty" })
    progress: number;

    @Column('varchar', { length: 300, nullable: true })
    message: string;

    @Column('varchar', { length: 300, nullable: true })
    outFileOriginalName: string;

    @Column('varchar', { length: 300, nullable: true })
    outFileUUIDName: string;

    @Column('varchar', { length: 300, nullable: true })
    outFilePath: string

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
