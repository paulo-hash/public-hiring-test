import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJoin1732766610158 implements MigrationInterface {
    name = 'CreateJoin1732766610158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP CONSTRAINT "FK_0bf0c4f5a97b6d4f6350564b874"`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP COLUMN "emissionCO2"`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD "emissionCO2" double precision`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP CONSTRAINT "UQ_0bf0c4f5a97b6d4f6350564b874"`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD CONSTRAINT "FK_0bf0c4f5a97b6d4f6350564b874" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP CONSTRAINT "FK_0bf0c4f5a97b6d4f6350564b874"`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD CONSTRAINT "UQ_0bf0c4f5a97b6d4f6350564b874" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP COLUMN "emissionCO2"`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD "emissionCO2" integer`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD CONSTRAINT "FK_0bf0c4f5a97b6d4f6350564b874" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
