import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ["quiz", "short", "long"], required: true },
  options: [{ type: String }],
  correctAnswer: { type: String },
});

const assessmentSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true },
);

export const assessmentModel =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);
