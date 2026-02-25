import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  body: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
});

export const postModel =
  mongoose.models.post || mongoose.model("post", postSchema);
