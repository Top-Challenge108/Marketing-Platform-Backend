import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyToolTable1713169682920 implements MigrationInterface {
    name = 'ModifyToolTable1713169682920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" ADD "stripe_subscription_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "UQ_b7a5f88240512dd46f2184071dc" UNIQUE ("stripe_subscription_id")`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_77a74a24fdc39036511f077d52e" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_b7a5f88240512dd46f2184071dc" FOREIGN KEY ("stripe_subscription_id") REFERENCES "stripe_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_b7a5f88240512dd46f2184071dc"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_77a74a24fdc39036511f077d52e"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "UQ_b7a5f88240512dd46f2184071dc"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "stripe_subscription_id"`);
    }

}
