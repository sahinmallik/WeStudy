/*
  Warnings:

  - Added the required column `userCount` to the `GroupAdded` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupAdded" ADD COLUMN     "userCount" BIGINT NOT NULL;
