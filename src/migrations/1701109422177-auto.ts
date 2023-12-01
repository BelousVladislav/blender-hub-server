import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701109422177 implements MigrationInterface {
    name = 'Auto1701109422177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "uuidToken"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "uuidToken" varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "uuidToken"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "uuidToken" uniqueidentifier NOT NULL`);
    }

}
