import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1701109029153 implements MigrationInterface {
    name = 'Auto1701109029153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "renders" DROP CONSTRAINT "FK_67f776f3ab21409b3ecbb034ab2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_266dea9aee3073a8a5e4d92845f"`);
        await queryRunner.query(`EXEC sp_rename "freeblender.dbo.projects.project_uuid", "uuidToken"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "uuidToken"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "uuidToken" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "renders" ADD CONSTRAINT "FK_67f776f3ab21409b3ecbb034ab2" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_266dea9aee3073a8a5e4d92845f" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_266dea9aee3073a8a5e4d92845f"`);
        await queryRunner.query(`ALTER TABLE "renders" DROP CONSTRAINT "FK_67f776f3ab21409b3ecbb034ab2"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "uuidToken"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "uuidToken" uniqueidentifier NOT NULL CONSTRAINT "DF_cb0c099512e9a8a67d72a131de9" DEFAULT NEWSEQUENTIALID()`);
        await queryRunner.query(`EXEC sp_rename "freeblender.dbo.projects.uuidToken", "project_uuid"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_266dea9aee3073a8a5e4d92845f" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "renders" ADD CONSTRAINT "FK_67f776f3ab21409b3ecbb034ab2" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
