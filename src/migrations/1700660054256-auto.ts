import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700660054256 implements MigrationInterface {
    name = 'Auto1700660054256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "statuses" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(300) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_c7d9c37179e64b201e69816655a" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_4981d0bf5a2f58304e56c969073" DEFAULT getdate(), CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "renders" ("id" int NOT NULL IDENTITY(1,1), "projectId" int NOT NULL, "inFileOriginalName" varchar(300) NOT NULL, "inFileUUIDName" varchar(300) NOT NULL, "inFilePath" varchar(300) NOT NULL, "statusId" int NOT NULL, "workerId" uniqueidentifier, "progress" int NOT NULL, "message" varchar(300) NOT NULL, "outFileOriginalName" varchar(300) NOT NULL, "outFileUUIDName" varchar(300) NOT NULL, "outFilePath" varchar(300) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_5820d4ac695d1a04fbaceeb7feb" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_59125d914cd6d39f225fd898e1c" DEFAULT getdate(), CONSTRAINT "UQ_b28b20c3911d390e08eed14d9dc" UNIQUE ("inFileUUIDName"), CONSTRAINT "PK_a5678fd96b9b0f258b93177c4d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "renders" ADD CONSTRAINT "FK_67f776f3ab21409b3ecbb034ab2" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "renders" ADD CONSTRAINT "FK_629c27d5d6270c6be7242caea1a" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "renders" ADD CONSTRAINT "FK_e094b46d6cee44b3e7fafb93b04" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "renders" DROP CONSTRAINT "FK_e094b46d6cee44b3e7fafb93b04"`);
        await queryRunner.query(`ALTER TABLE "renders" DROP CONSTRAINT "FK_629c27d5d6270c6be7242caea1a"`);
        await queryRunner.query(`ALTER TABLE "renders" DROP CONSTRAINT "FK_67f776f3ab21409b3ecbb034ab2"`);
        await queryRunner.query(`DROP TABLE "renders"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
    }

}
