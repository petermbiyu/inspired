import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGO_URI}/mbiyuinsight`);
};
