import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700564191910 implements MigrationInterface {
    name = 'Auto1700564191910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "name" nvarchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" nvarchar(2000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "tags" nvarchar(2000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "tags" varchar(2000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" varchar(2000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "name" varchar(150) NOT NULL`);
    }

}
