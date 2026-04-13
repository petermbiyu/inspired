import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  textMessage: { type: String, required: true },
});

export const contactModel =
  mongoose.models.contact || mongoose.model("contact", contactSchema);
