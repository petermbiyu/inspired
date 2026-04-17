import { prisma } from "../config/DBConnect.js";
import { transport } from "../config/nodemailer.js";

export const message = async (req, res) => {
  const { firstname, lastname, email, textMessage } = req.body;
  const username = `${firstname} ${lastname}`;
  if (!firstname || !lastname || !email || !textMessage) {
    return res.json({ success: false, message: "Please fill all fields" });
  }

  try {
    let contact;
    if (req.user && req.user.id) {
      await prisma.contact.create({
        data: { username, email, message: textMessage, userId: req.user.id },
      });
    } else {
      await prisma.contact.create({
        data: { username, email, message: textMessage },
      });
    }
    // send user confirmation
    const mailOptions = {
      from: `"MbiyuInspired" <${process.env.EMAIL_FROM || "petersmasha@gmail.com"}>`,
      to: email,
      subject: "Messeage Recieved - MbiyuInspired",
      html: `
      <div>
        <h2>Thank you for contacting us ${firstname}</h2>
        <p>We have recieved your message and will get back on you within 24 hours.</p>
        <h3>Your Message</h3>
        <p>${textMessage}</p>
        <hr />
        <p>This is an automated confirmation. Please do not reply to this email</p>
      </div>
      `,
    };
    // send mail (don't block if confirmation fails)
    try {
      await transport.sendMail(mailOptions);
      console.log("confirmation email sent to: ", email);
    } catch (error) {
      console.error("Email sending failed: ", error.message);
    }

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
