
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, BeforeInsert, Generated, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Worker } from '../../worker/entities/worker.entity';
import { Project } from '../../project/entities/project.entity';
import { Render } from '../../render/entities/render.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ "message": "Login field cannot be empty" })
    @Column('varchar', { length: 150, nullable: false, unique: true })
    login: string;

    @IsNotEmpty({ "message": "Email field cannot be empty" })
    @IsEmail()
    @Column('varchar', { length: 150, nullable: false, unique: true })
    email: string;

    @IsNotEmpty({ "message": "password field cannot be empty" })
    @Column('varchar', { length: 250, nullable: false })
    password: string;

    @Column({ generated: 'uuid' })
    client_uuid: string;

    @Column({ generated: 'uuid' })
    worker_uuid: string;

    @OneToMany(() => Worker, (worker) => worker.user)
    workers: Worker[];

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    // @OneToMany(() => Render, (render) => render.user)
    // renders: Worker[];

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
