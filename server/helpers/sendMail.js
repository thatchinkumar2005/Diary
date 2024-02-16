import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PSWD,
  },
});

var mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Diary",
    link: "diary.com",
  },
});

export default async function sendMail({
  to: { name, address },
  type,
  mailToken,
}) {
  if (type === "verify") {
    const url = `http://localhost:5173/auth/verify/${mailToken}`; //replace with frontend url
    var email = {
      body: {
        name: name,
        intro: "Verify Your Mail to use Diary",
        action: {
          instructions: "To verify, please click here:",
          button: {
            color: "#FF6868", // Optional action button color
            text: "Verify your account",
            link: url,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    var emailBody = mailGenerator.generate(email);

    const resp = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: address,
      subject: "Verify your diary account 📒",
      html: emailBody,
    });
    console.log(resp);

    return resp;
  }
  return;
}

// await sendMail({
//   to: { name: "Thatchin", address: process.env.GMAIL_USER },
//   type: "verify",
//   mailToken: "adfsahdgsdgn",
// });
