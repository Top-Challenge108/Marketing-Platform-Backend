import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowingNullNameToolDeal1714040043746 implements MigrationInterface {
    name = 'AllowingNullNameToolDeal1714040043746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_deals" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_deals" ALTER COLUMN "name" SET NOT NULL`);
    }

}
