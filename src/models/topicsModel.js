import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const topicsModel =
  mongoose.models.topic || mongoose.model("topic", topicSchema);
