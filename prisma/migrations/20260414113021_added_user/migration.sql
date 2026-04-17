-- CreateEnum
CREATE TYPE "role" AS ENUM ('LEARNER', 'TUTOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'LEARNER',
    "password" TEXT NOT NULL,
    "verifyOtp" TEXT,
    "verifyOtpExpireAt" INTEGER NOT NULL DEFAULT 0,
    "isAccountVerified" BOOLEAN NOT NULL DEFAULT false,
    "resetOtp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
