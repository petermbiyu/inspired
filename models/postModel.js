import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    body: { type: String, required: true },
    snippet: { type: String, required: true },
    topic: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const postModel =
  mongoose.models.post || mongoose.model("post", postSchema);
