import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.B_USER,
    pass: process.env.B_PASS,
  },
});
