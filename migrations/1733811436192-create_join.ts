import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJoin1733811436192 implements MigrationInterface {
    name = 'CreateJoin1733811436192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_a8715e13fe3df8379ea86e014fe"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "carbonEmissionFactorId"`);
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" ADD "version" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "carbonEmissionFactorId" integer`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_a8715e13fe3df8379ea86e014fe" FOREIGN KEY ("carbonEmissionFactorId") REFERENCES "carbon_emission_factors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
