import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateToolAndToolDealTable1712940060636 implements MigrationInterface {
    name = 'CreateToolAndToolDealTable1712940060636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tools" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "short_description" text, "description" text, "website" character varying NOT NULL, "logo" character varying NOT NULL, "screenshots" text NOT NULL DEFAULT '[]', "key_features" text NOT NULL, "use_cases" text NOT NULL, "price" integer NOT NULL DEFAULT '0', "category_id" uuid NOT NULL, CONSTRAINT "UQ_d95e4bbca1f6fffc98a6cf12973" UNIQUE ("name"), CONSTRAINT "PK_e23d56734caad471277bad8bf85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tool_deals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "descriptions" text, "price" integer NOT NULL DEFAULT '0', "discount_price" integer NOT NULL DEFAULT '0', "tool_id" uuid NOT NULL, CONSTRAINT "UQ_c0f77ab5e18ca56122717cacd35" UNIQUE ("name"), CONSTRAINT "PK_435e8c78b237aa03b4351e6f7ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tool_deals" ADD CONSTRAINT "FK_afd150efbd8a9a833cafa3501f5" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_deals" DROP CONSTRAINT "FK_afd150efbd8a9a833cafa3501f5"`);
        await queryRunner.query(`DROP TABLE "tool_deals"`);
        await queryRunner.query(`DROP TABLE "tools"`);
    }

}
