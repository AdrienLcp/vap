/*
  Warnings:

  - The primary key for the `cart_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cart_items` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."cart_items_userId_productId_key";

-- AlterTable
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("userId", "productId");
