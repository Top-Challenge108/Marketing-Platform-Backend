import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyAllowDecimalInPrice1713242083495 implements MigrationInterface {
    name = 'ModifyAllowDecimalInPrice1713242083495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_deals" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "tool_deals" ADD "price" numeric(10,5) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tool_deals" DROP COLUMN "discount_price"`);
        await queryRunner.query(`ALTER TABLE "tool_deals" ADD "discount_price" numeric(10,5) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" ADD "price" numeric(10,5) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "tools" ADD "price" numeric(10,5) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "price" numeric(10,5) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "tools" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tool_deals" DROP COLUMN "discount_price"`);
        await queryRunner.query(`ALTER TABLE "tool_deals" ADD "discount_price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tool_deals" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "tool_deals" ADD "price" integer NOT NULL DEFAULT '0'`);
    }

}
