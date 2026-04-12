/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `payment_methods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "payment_methods" DROP CONSTRAINT "payment_methods_userId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentMethodId";

-- DropTable
DROP TABLE "payment_methods";

-- DropEnum
DROP TYPE "PaymentProvider";

-- DropEnum
DROP TYPE "PaymentType";
