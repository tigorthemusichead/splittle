-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_payedToId_fkey";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "payedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payedToId_fkey" FOREIGN KEY ("payedToId") REFERENCES "User"("clerk_id") ON DELETE SET NULL ON UPDATE CASCADE;
