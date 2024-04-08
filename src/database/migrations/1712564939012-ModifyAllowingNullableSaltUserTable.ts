import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyAllowingNullableSaltUserTable1712564939012 implements MigrationInterface {
    name = 'ModifyAllowingNullableSaltUserTable1712564939012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "salt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "salt" SET NOT NULL`);
    }

}
