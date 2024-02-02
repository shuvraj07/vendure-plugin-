import {MigrationInterface, QueryRunner} from "typeorm";

export class feedback1706103501522 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "feedback_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('Anonymous'), "email" varchar NOT NULL DEFAULT ('Anonymous'), "phone" varchar NOT NULL DEFAULT ('Anonymous'), "feedback" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "feedback_entity"`, undefined);
   }

}
