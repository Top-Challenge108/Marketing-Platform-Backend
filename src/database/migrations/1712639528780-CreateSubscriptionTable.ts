import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubscriptionTable1712639528780 implements MigrationInterface {
    name = 'CreateSubscriptionTable1712639528780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "price" character varying, "interval" character varying NOT NULL DEFAULT 'month', "currency" character varying NOT NULL DEFAULT 'usd', CONSTRAINT "UQ_e03f7748dc1247e31dc8078fee7" UNIQUE ("name"), CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscriptions"`);
    }

}
