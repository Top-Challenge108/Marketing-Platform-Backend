import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueNameToolDealTable1712941153576 implements MigrationInterface {
    name = 'RemoveUniqueNameToolDealTable1712941153576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_deals" DROP CONSTRAINT "UQ_c0f77ab5e18ca56122717cacd35"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_deals" ADD CONSTRAINT "UQ_c0f77ab5e18ca56122717cacd35" UNIQUE ("name")`);
    }

}
