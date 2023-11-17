import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700164784610 implements MigrationInterface {
    name = 'Auto1700164784610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "freeblender.dbo.users.userName", "login"`);
        await queryRunner.query(`EXEC sp_rename "freeblender.dbo.users.UQ_226bb9aa7aa8a69991209d58f59", "UQ_2d443082eccd5198f95f2a36e2c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "freeblender.dbo.users.UQ_2d443082eccd5198f95f2a36e2c", "UQ_226bb9aa7aa8a69991209d58f59"`);
        await queryRunner.query(`EXEC sp_rename "freeblender.dbo.users.login", "userName"`);
    }

}
