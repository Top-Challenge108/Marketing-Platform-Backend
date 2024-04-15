import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCateogoryTable1713165315212 implements MigrationInterface {
    name = 'CreateCateogoryTable1713165315212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "handle" character varying, "description" text, "user_id" uuid NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_2296b7fe012d95646fa41921c8b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_2296b7fe012d95646fa41921c8b"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
