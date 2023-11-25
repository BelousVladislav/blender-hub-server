import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700422451803 implements MigrationInterface {
    name = 'Auto1700422451803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" ADD "currSocketId" varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" DROP COLUMN "currSocketId"`);
    }

}
