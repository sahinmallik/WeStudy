/*
  Warnings:

  - Made the column `videoUrl` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "videoUrl" SET NOT NULL,
ALTER COLUMN "videoUrl" SET DEFAULT '';
