/*
  Warnings:

  - The primary key for the `GroupsOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expance" DROP CONSTRAINT "Expance_payerId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsOnUsers" DROP CONSTRAINT "GroupsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Expance" ALTER COLUMN "payerId" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "GroupsOnUsers" DROP CONSTRAINT "GroupsOnUsers_pkey",
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(32),
ADD CONSTRAINT "GroupsOnUsers_pkey" PRIMARY KEY ("userId", "groupId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("clerk_id");

-- AddForeignKey
ALTER TABLE "GroupsOnUsers" ADD CONSTRAINT "GroupsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expance" ADD CONSTRAINT "Expance_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
