import { MigrationInterface, QueryRunner } from "typeorm";

export class FINALE1732777965512 implements MigrationInterface {
    name = 'FINALE1732777965512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" ADD "source" character varying DEFAULT 'Agrybalise'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_foot_print" DROP COLUMN "source"`);
    }

}
