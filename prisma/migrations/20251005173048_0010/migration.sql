/*
  Warnings:

  - The primary key for the `cart_items` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_pkey",
ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("productId", "userId");
