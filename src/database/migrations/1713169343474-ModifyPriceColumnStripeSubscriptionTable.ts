import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPriceColumnStripeSubscriptionTable1713169343474 implements MigrationInterface {
    name = 'ModifyPriceColumnStripeSubscriptionTable1713169343474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" ADD "price" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "stripe_subscriptions" ADD "price" character varying NOT NULL`);
    }

}
