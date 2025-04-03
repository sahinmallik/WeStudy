/*
  Warnings:

  - The primary key for the `GroupRecentActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "GroupRecentActivity" DROP CONSTRAINT "GroupRecentActivity_pkey",
ADD CONSTRAINT "GroupRecentActivity_pkey" PRIMARY KEY ("groupId");
