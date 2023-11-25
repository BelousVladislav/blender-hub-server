import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Render } from '../../render/entities/render.entity';

@Entity({ name: 'statuses' })
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('nvarchar', { length: 300, nullable: false })
    name: string;

    @OneToMany(() => Render, (render) => render.status)
    renders: Render[];

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}