import {MigrationInterface, QueryRunner} from "typeorm";

export class productReview1706379915454 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "review_product_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('Anonymous'), "stars" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "productId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_review_product_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('Anonymous'), "stars" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "productId" integer, CONSTRAINT "FK_6526a177cc2e9ea121b2d0091e4" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_674e82a815eb9587ace52f1c9c3" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_review_product_entity"("createdAt", "updatedAt", "name", "stars", "id", "customerId", "productId") SELECT "createdAt", "updatedAt", "name", "stars", "id", "customerId", "productId" FROM "review_product_entity"`, undefined);
        await queryRunner.query(`DROP TABLE "review_product_entity"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_review_product_entity" RENAME TO "review_product_entity"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review_product_entity" RENAME TO "temporary_review_product_entity"`, undefined);
        await queryRunner.query(`CREATE TABLE "review_product_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('Anonymous'), "stars" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "productId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "review_product_entity"("createdAt", "updatedAt", "name", "stars", "id", "customerId", "productId") SELECT "createdAt", "updatedAt", "name", "stars", "id", "customerId", "productId" FROM "temporary_review_product_entity"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_review_product_entity"`, undefined);
        await queryRunner.query(`DROP TABLE "review_product_entity"`, undefined);
   }

}
