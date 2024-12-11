import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteColumn1733901822119 implements MigrationInterface {
    name = 'DeleteColumn1733901822119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" DROP COLUMN "version"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" ADD "version" integer NOT NULL`);
    }

}
