import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700473055225 implements MigrationInterface {
    name = 'Auto1700473055225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "tags" varchar(2000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "tags"`);
    }

}
