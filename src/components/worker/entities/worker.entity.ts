
import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Render } from '../../render/entities/render.entity';

@Entity({ name: 'workers' })
export class Worker extends BaseEntity {
    @PrimaryColumn("uuid")
    id: string;

    @Column('decimal', { precision: 18, scale: 2, nullable: true })
    blenderVersion: number;

    @Column('varchar', { nullable: true })
    os: string;

    @Column('varchar')
    gpuName: string;

    @Column('varchar')
    donate: string;

    @ManyToOne(() => User, (user) => user.workers)
    user: User;

    @Column('int')
    userId: number;

    @Column()
    isOnline: boolean;

    @Column('varchar', { nullable: true })
    currSocketId: string;

    @OneToMany(() => Render, (render) => render.worker)
    renders: Render[];

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
