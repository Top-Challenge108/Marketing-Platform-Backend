import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileTable1713334049027 implements MigrationInterface {
    name = 'CreateFileTable1713334049027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "public_id" character varying, "version" integer, "signature" character varying, "width" numeric(9,4), "height" numeric(9,4), "format" character varying, "resource_type" character varying, "tags" text, "pages" integer, "bytes" integer, "type" character varying, "etag" character varying, "placeholder" character varying, "url" character varying, "secure_url" character varying, "access_mode" character varying, "original_filename" character varying, "moderation" text NOT NULL DEFAULT '[]', "access_control" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tools" ADD "logo_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tools" ADD "screenshot_id" text NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "logo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "logo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "screenshot_id"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "logo_id"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
