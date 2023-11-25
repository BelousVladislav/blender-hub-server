import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700422144439 implements MigrationInterface {
    name = 'Auto1700422144439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "blenderVersion" decimal(18,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" ALTER COLUMN "blenderVersion" decimal(18,0)`);
    }

}
