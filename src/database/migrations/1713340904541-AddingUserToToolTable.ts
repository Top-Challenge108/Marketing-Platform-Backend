import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingUserToToolTable1713340904541 implements MigrationInterface {
    name = 'AddingUserToToolTable1713340904541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_96158ff69b91b8b52ff6f361174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_96158ff69b91b8b52ff6f361174"`);
        await queryRunner.query(`ALTER TABLE "tools" DROP COLUMN "user_id"`);
    }

}
