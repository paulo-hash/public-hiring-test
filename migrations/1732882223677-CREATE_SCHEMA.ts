import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATESCHEMA1732882223677 implements MigrationInterface {
    name = 'CREATESCHEMA1732882223677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carbon_emission_factors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" character varying NOT NULL, "emissionCO2eInKgPerUnit" double precision NOT NULL, "source" character varying NOT NULL, CONSTRAINT "PK_e6a201ea58a7b4cdec0ca1c0c61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" character varying NOT NULL, "quantity" double precision NOT NULL, "productId" integer, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carbon_foot_print" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "source" character varying DEFAULT 'Agrybalise', "emissionCO2" double precision, "productId" integer, CONSTRAINT "PK_dd7a061ced52dbdb6f5f26c0a6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_22cc43e9a74d7498546e9a63e7" ON "product" ("name") `);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_45086227ab44452354335f03876" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD CONSTRAINT "FK_0bf0c4f5a97b6d4f6350564b874" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP CONSTRAINT "FK_0bf0c4f5a97b6d4f6350564b874"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_45086227ab44452354335f03876"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22cc43e9a74d7498546e9a63e7"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "carbon_foot_print"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "carbon_emission_factors"`);
    }

}
