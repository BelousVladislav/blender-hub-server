import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700080158141 implements MigrationInterface {
    name = 'Auto1700080158141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "userName" varchar(150) NOT NULL, "email" varchar(150) NOT NULL, "password" varchar(250) NOT NULL, "client_uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_fbd86bbf86785a93b896990063e" DEFAULT NEWSEQUENTIALID(), "worker_uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_77dbd81b469e021783a15991b38" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
