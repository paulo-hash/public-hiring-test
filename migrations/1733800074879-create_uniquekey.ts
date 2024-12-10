import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUniquekey1733800074879 implements MigrationInterface {
    name = 'CreateUniquekey1733800074879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" ADD CONSTRAINT "UQ_57096ef561d0d6c1c3570613211" UNIQUE ("name")`);
        await queryRunner.query(`CREATE INDEX "IDX_57096ef561d0d6c1c357061321" ON "carbon_emission_factors" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_57096ef561d0d6c1c357061321"`);
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" DROP CONSTRAINT "UQ_57096ef561d0d6c1c3570613211"`);
    }

}
