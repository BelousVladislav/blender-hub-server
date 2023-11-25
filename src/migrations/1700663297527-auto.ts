import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700663297527 implements MigrationInterface {
    name = 'Auto1700663297527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "message" varchar(300)`);
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "outFileOriginalName" varchar(300)`);
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "outFileUUIDName" varchar(300)`);
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "outFilePath" varchar(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "outFilePath" varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "outFileUUIDName" varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "outFileOriginalName" varchar(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "renders" ALTER COLUMN "message" varchar(300) NOT NULL`);
    }

}
