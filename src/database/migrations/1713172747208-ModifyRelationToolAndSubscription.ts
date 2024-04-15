import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRelationToolAndSubscription1713172747208 implements MigrationInterface {
    name = 'ModifyRelationToolAndSubscription1713172747208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_b7a5f88240512dd46f2184071dc"`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "stripe_subscription_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_b7a5f88240512dd46f2184071dc" FOREIGN KEY ("stripe_subscription_id") REFERENCES "stripe_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_b7a5f88240512dd46f2184071dc"`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "stripe_subscription_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_b7a5f88240512dd46f2184071dc" FOREIGN KEY ("stripe_subscription_id") REFERENCES "stripe_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
