/*
  Warnings:

  - You are about to drop the `LearningArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_learningAreaId_fkey";

-- DropForeignKey
ALTER TABLE "LearningArea" DROP CONSTRAINT "LearningArea_learnerId_fkey";

-- DropForeignKey
ALTER TABLE "LearningArea" DROP CONSTRAINT "LearningArea_tutorId_fkey";

-- DropTable
DROP TABLE "LearningArea";

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classLevel" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "classCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_classCode_key" ON "Class"("classCode");

-- CreateIndex
CREATE UNIQUE INDEX "Class_tutorId_classCode_key" ON "Class"("tutorId", "classCode");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_classId_learnerId_key" ON "Enrollment"("classId", "learnerId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_learningAreaId_fkey" FOREIGN KEY ("learningAreaId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
