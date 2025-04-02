/*
  Warnings:

  - You are about to drop the column `userCount` on the `GroupAdded` table. All the data in the column will be lost.
  - Added the required column `userCount` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "userCount" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "GroupAdded" DROP COLUMN "userCount";
