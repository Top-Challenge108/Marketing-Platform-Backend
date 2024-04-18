import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStatusFieldToolTable1713337843936 implements MigrationInterface {
    name = 'CreateStatusFieldToolTable1713337843936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tools_status_enum" AS ENUM('pending', 'published')`);
        await queryRunner.query(`ALTER TABLE "tools" ADD "status" "public"."tools_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."tools_status_enum"`);
    }

}
