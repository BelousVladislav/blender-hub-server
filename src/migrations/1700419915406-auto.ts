import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1700419915406 implements MigrationInterface {
    name = 'Auto1700419915406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workers" ("id" uniqueidentifier NOT NULL, "blenderVersion" decimal, "os" varchar(255), "gpuName" varchar(255) NOT NULL, "donate" varchar(255) NOT NULL, "userId" int NOT NULL, "isOnline" bit NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_de1a0567b79df3fdbba2f395797" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d4eae01f43005c84e870c09b064" DEFAULT getdate(), CONSTRAINT "PK_e950c9aba3bd84a4f193058d838" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workers" ADD CONSTRAINT "FK_fdefd9252e90173f66271f76b96" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" DROP CONSTRAINT "FK_fdefd9252e90173f66271f76b96"`);
        await queryRunner.query(`DROP TABLE "workers"`);
    }

}
