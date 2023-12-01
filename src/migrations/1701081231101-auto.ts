import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701081231101 implements MigrationInterface {
    name = 'Auto1701081231101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" int NOT NULL IDENTITY(1,1), "description" nvarchar(2000) NOT NULL, "projectId" int NOT NULL, "userId" int NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_94ffa05f2fb3da114904ba901bd" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_4a2de01dd822709aef7b2620946" DEFAULT getdate(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_266dea9aee3073a8a5e4d92845f" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_266dea9aee3073a8a5e4d92845f"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
