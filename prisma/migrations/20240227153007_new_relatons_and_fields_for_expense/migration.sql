/*
  Warnings:

  - Added the required column `payedToId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "isSplit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payedToId" VARCHAR(32) NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payedToId_fkey" FOREIGN KEY ("payedToId") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
