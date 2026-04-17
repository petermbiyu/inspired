import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const DBConnect = async () => {
  try {
    await prisma.$connect();
    console.log("DB connection established via prisma");
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};
