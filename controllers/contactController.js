import validator from "validator";
import { transport } from "../config/nodemailer.js";
import { contactModel } from "../models/contactModel.js";

export const message = async (req, res) => {
  const { firstname, lastname, email, textMessage } = req.body;

  if (!firstname || !lastname || !email || !textMessage) {
    return res.json({ success: false, message: "Please fill all fields" });
  }

  try {
    const checkmail = validator.isEmail(email);
    if (!checkmail) {
      return res.json({ success: false, message: "Enter a valid e-mail" });
    }

    const newContact = new contactModel({
      firstname,
      lastname,
      email,
      textMessage,
    });
    await newContact.save();

    const mailOptions = {
      from: "petersmasha@gmail.com",
      to: email,
      subject: "Messeage Delivery Success",
      text: "Thank you for contacting MbiyuInspired. It nomally takes 24 hours to get back on you.",
    };
    const mailing = await transport.sendMail(mailOptions);

    if (!mailing) {
      return res.json({ sucess: true, message: "Unable to send your message" });
    }
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
