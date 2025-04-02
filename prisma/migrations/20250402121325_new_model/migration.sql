/*
  Warnings:

  - You are about to alter the column `userCount` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `GroupAdded` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GroupAdded` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "userCount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "GroupAdded" DROP CONSTRAINT "GroupAdded_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "GroupAdded_pkey" PRIMARY KEY ("userId", "groupId");

-- CreateIndex
CREATE INDEX "Group_tag_idx" ON "Group"("tag");

-- CreateIndex
CREATE INDEX "Group_specialization_idx" ON "Group"("specialization");

-- CreateIndex
CREATE INDEX "Group_groupName_idx" ON "Group"("groupName");

-- CreateIndex
CREATE INDEX "User_clerkUserId_idx" ON "User"("clerkUserId");
