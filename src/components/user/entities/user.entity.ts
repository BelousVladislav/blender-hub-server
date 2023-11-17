
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, BeforeInsert, Generated } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ "message": "UserName field cannot be empty" })
    @Column('varchar', { length: 150, nullable: false, unique: true })
    login: string;

    @IsNotEmpty({ "message": "Email field cannot be empty" })
    @IsEmail()
    @Column('varchar', { length: 150, nullable: false, unique: true })
    email: string;

    @IsNotEmpty({ "message": "Email field cannot be empty" })
    @Column('varchar', { length: 250, nullable: false })
    password: string;

    @Column({ generated: 'uuid' })
    client_uuid: string;

    @Column({ generated: 'uuid' })
    worker_uuid: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        console.log(this.password)
        this.password = await bcrypt.hash(this.password, 12);
    };
}
