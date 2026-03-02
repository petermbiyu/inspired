import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["tutor", "student"], required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpire: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpire: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
