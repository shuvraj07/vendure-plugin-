import {MigrationInterface, QueryRunner} from "typeorm";

export class naya1705347309083 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "extended_customer_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "customField" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFieldsAvatarurl" text, CONSTRAINT "REL_a0eb49ffce7563c137b5bd6877" UNIQUE ("userId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity_groups_customer_group" ("extendedCustomerEntityId" integer NOT NULL, "customerGroupId" integer NOT NULL, PRIMARY KEY ("extendedCustomerEntityId", "customerGroupId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0e6d19de59839a4c3357d61c75" ON "extended_customer_entity_groups_customer_group" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f0df42d6f631dfaa1b84ca1579" ON "extended_customer_entity_groups_customer_group" ("customerGroupId") `, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity_channels_channel" ("extendedCustomerEntityId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("extendedCustomerEntityId", "channelId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_12a74f169936831320df7523fa" ON "extended_customer_entity_channels_channel" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_be614ff3ef86ab7a22533e073f" ON "extended_customer_entity_channels_channel" ("channelId") `, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("extendedCustomerEntityId" integer NOT NULL, "wishlistItemId" integer NOT NULL, PRIMARY KEY ("extendedCustomerEntityId", "wishlistItemId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_728c798037364f5eb2904887a2" ON "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f17b505a63e90c6b776f4ef6bf" ON "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("wishlistItemId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_extended_customer_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "customField" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFieldsAvatarurl" text, CONSTRAINT "REL_a0eb49ffce7563c137b5bd6877" UNIQUE ("userId"), CONSTRAINT "FK_a0eb49ffce7563c137b5bd6877d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_extended_customer_entity"("createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "customField", "id", "userId", "customFieldsAvatarurl") SELECT "createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "customField", "id", "userId", "customFieldsAvatarurl" FROM "extended_customer_entity"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_extended_customer_entity" RENAME TO "extended_customer_entity"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0e6d19de59839a4c3357d61c75"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f0df42d6f631dfaa1b84ca1579"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_extended_customer_entity_groups_customer_group" ("extendedCustomerEntityId" integer NOT NULL, "customerGroupId" integer NOT NULL, CONSTRAINT "FK_0e6d19de59839a4c3357d61c75d" FOREIGN KEY ("extendedCustomerEntityId") REFERENCES "extended_customer_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f0df42d6f631dfaa1b84ca1579f" FOREIGN KEY ("customerGroupId") REFERENCES "customer_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("extendedCustomerEntityId", "customerGroupId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_extended_customer_entity_groups_customer_group"("extendedCustomerEntityId", "customerGroupId") SELECT "extendedCustomerEntityId", "customerGroupId" FROM "extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_extended_customer_entity_groups_customer_group" RENAME TO "extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0e6d19de59839a4c3357d61c75" ON "extended_customer_entity_groups_customer_group" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f0df42d6f631dfaa1b84ca1579" ON "extended_customer_entity_groups_customer_group" ("customerGroupId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_12a74f169936831320df7523fa"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_be614ff3ef86ab7a22533e073f"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_extended_customer_entity_channels_channel" ("extendedCustomerEntityId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_12a74f169936831320df7523fa4" FOREIGN KEY ("extendedCustomerEntityId") REFERENCES "extended_customer_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_be614ff3ef86ab7a22533e073f3" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("extendedCustomerEntityId", "channelId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_extended_customer_entity_channels_channel"("extendedCustomerEntityId", "channelId") SELECT "extendedCustomerEntityId", "channelId" FROM "extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_extended_customer_entity_channels_channel" RENAME TO "extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_12a74f169936831320df7523fa" ON "extended_customer_entity_channels_channel" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_be614ff3ef86ab7a22533e073f" ON "extended_customer_entity_channels_channel" ("channelId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_728c798037364f5eb2904887a2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f17b505a63e90c6b776f4ef6bf"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("extendedCustomerEntityId" integer NOT NULL, "wishlistItemId" integer NOT NULL, CONSTRAINT "FK_728c798037364f5eb2904887a29" FOREIGN KEY ("extendedCustomerEntityId") REFERENCES "extended_customer_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f17b505a63e90c6b776f4ef6bfd" FOREIGN KEY ("wishlistItemId") REFERENCES "wishlist_item" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("extendedCustomerEntityId", "wishlistItemId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_extended_customer_entity_custom_fields_wishlist_items_wishlist_item"("extendedCustomerEntityId", "wishlistItemId") SELECT "extendedCustomerEntityId", "wishlistItemId" FROM "extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_extended_customer_entity_custom_fields_wishlist_items_wishlist_item" RENAME TO "extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_728c798037364f5eb2904887a2" ON "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f17b505a63e90c6b776f4ef6bf" ON "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("wishlistItemId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_f17b505a63e90c6b776f4ef6bf"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_728c798037364f5eb2904887a2"`, undefined);
        await queryRunner.query(`ALTER TABLE "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" RENAME TO "temporary_extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("extendedCustomerEntityId" integer NOT NULL, "wishlistItemId" integer NOT NULL, PRIMARY KEY ("extendedCustomerEntityId", "wishlistItemId"))`, undefined);
        await queryRunner.query(`INSERT INTO "extended_customer_entity_custom_fields_wishlist_items_wishlist_item"("extendedCustomerEntityId", "wishlistItemId") SELECT "extendedCustomerEntityId", "wishlistItemId" FROM "temporary_extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f17b505a63e90c6b776f4ef6bf" ON "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("wishlistItemId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_728c798037364f5eb2904887a2" ON "extended_customer_entity_custom_fields_wishlist_items_wishlist_item" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_be614ff3ef86ab7a22533e073f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_12a74f169936831320df7523fa"`, undefined);
        await queryRunner.query(`ALTER TABLE "extended_customer_entity_channels_channel" RENAME TO "temporary_extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity_channels_channel" ("extendedCustomerEntityId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("extendedCustomerEntityId", "channelId"))`, undefined);
        await queryRunner.query(`INSERT INTO "extended_customer_entity_channels_channel"("extendedCustomerEntityId", "channelId") SELECT "extendedCustomerEntityId", "channelId" FROM "temporary_extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_be614ff3ef86ab7a22533e073f" ON "extended_customer_entity_channels_channel" ("channelId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_12a74f169936831320df7523fa" ON "extended_customer_entity_channels_channel" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f0df42d6f631dfaa1b84ca1579"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0e6d19de59839a4c3357d61c75"`, undefined);
        await queryRunner.query(`ALTER TABLE "extended_customer_entity_groups_customer_group" RENAME TO "temporary_extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity_groups_customer_group" ("extendedCustomerEntityId" integer NOT NULL, "customerGroupId" integer NOT NULL, PRIMARY KEY ("extendedCustomerEntityId", "customerGroupId"))`, undefined);
        await queryRunner.query(`INSERT INTO "extended_customer_entity_groups_customer_group"("extendedCustomerEntityId", "customerGroupId") SELECT "extendedCustomerEntityId", "customerGroupId" FROM "temporary_extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f0df42d6f631dfaa1b84ca1579" ON "extended_customer_entity_groups_customer_group" ("customerGroupId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0e6d19de59839a4c3357d61c75" ON "extended_customer_entity_groups_customer_group" ("extendedCustomerEntityId") `, undefined);
        await queryRunner.query(`ALTER TABLE "extended_customer_entity" RENAME TO "temporary_extended_customer_entity"`, undefined);
        await queryRunner.query(`CREATE TABLE "extended_customer_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "customField" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFieldsAvatarurl" text, CONSTRAINT "REL_a0eb49ffce7563c137b5bd6877" UNIQUE ("userId"))`, undefined);
        await queryRunner.query(`INSERT INTO "extended_customer_entity"("createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "customField", "id", "userId", "customFieldsAvatarurl") SELECT "createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "customField", "id", "userId", "customFieldsAvatarurl" FROM "temporary_extended_customer_entity"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_extended_customer_entity"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f17b505a63e90c6b776f4ef6bf"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_728c798037364f5eb2904887a2"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity_custom_fields_wishlist_items_wishlist_item"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_be614ff3ef86ab7a22533e073f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_12a74f169936831320df7523fa"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity_channels_channel"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f0df42d6f631dfaa1b84ca1579"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0e6d19de59839a4c3357d61c75"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity_groups_customer_group"`, undefined);
        await queryRunner.query(`DROP TABLE "extended_customer_entity"`, undefined);
   }

}
