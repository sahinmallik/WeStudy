/*
  Warnings:

  - The primary key for the `UserRecentActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserRecentActivity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRecentActivity" DROP CONSTRAINT "UserRecentActivity_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserRecentActivity_pkey" PRIMARY KEY ("userId");
