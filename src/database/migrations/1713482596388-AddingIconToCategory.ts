import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingIconToCategory1713482596388 implements MigrationInterface {
    name = 'AddingIconToCategory1713482596388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "icon" character varying`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "icon_id" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "icon_id"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "icon"`);
    }

}
