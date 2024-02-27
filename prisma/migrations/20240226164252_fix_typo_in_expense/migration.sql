/*
  Warnings:

  - You are about to drop the `Expance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expance" DROP CONSTRAINT "Expance_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Expance" DROP CONSTRAINT "Expance_payerId_fkey";

-- DropTable
DROP TABLE "Expance";

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "amount" INTEGER NOT NULL,
    "payerId" VARCHAR(32) NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
