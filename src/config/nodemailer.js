import nodemailer from "nodemailer";

export const transport = new nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.B_USER,
    pass: process.env.B_PASS,
  },
  logger: true,
  debug: true,
});
