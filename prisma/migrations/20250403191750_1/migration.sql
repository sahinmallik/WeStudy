/*
  Warnings:

  - The primary key for the `UserRecentActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `UserRecentActivity` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UserRecentActivity" DROP CONSTRAINT "UserRecentActivity_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserRecentActivity_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "UserRecentActivity_userId_idx" ON "UserRecentActivity"("userId");
