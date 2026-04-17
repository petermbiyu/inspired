/*
  Warnings:

  - You are about to drop the column `learningAreaId` on the `Assessment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_learningAreaId_fkey";

-- DropIndex
DROP INDEX "Assessment_learningAreaId_idx";

-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "learningAreaId",
ADD COLUMN     "classId" TEXT NOT NULL,
ALTER COLUMN "expireAt" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Assessment_classId_idx" ON "Assessment"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
