import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700472944676 implements MigrationInterface {
    name = 'Auto1700472944676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(150) NOT NULL, "userId" int NOT NULL, "description" varchar(2000) NOT NULL, "project_uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_b2c40732593ef21ab67d4e012ea" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_4a38e9851744414bbe8142157f4" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_7ac9a109e2afca520ed60ea5e00" DEFAULT getdate(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
