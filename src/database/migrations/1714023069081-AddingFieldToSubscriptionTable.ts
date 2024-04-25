import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingFieldToSubscriptionTable1714023069081 implements MigrationInterface {
    name = 'AddingFieldToSubscriptionTable1714023069081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "descriptions" text`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "discount_price" numeric(10,5) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "discount_price"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "descriptions"`);
    }

}
