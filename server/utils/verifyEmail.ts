import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import VerifyEmail from "./VerifyEmail.tsx";

type sendVerificationEmailProps = {
    reserverEmail: string;
    token: string;
    subject: string;
    reserverName: string;
}

const MY_EMAIL = Bun.env.MY_EMAIL || process.env.MY_EMAIL;
const MY_EMAIL_PASSWORD = Bun.env.MY_EMAIL_PASSWORD || process.env.MY_EMAIL_PASSWORD;

export const sendVerificationEmail = async ({
  reserverEmail,
  token,
  subject,
    reserverName,
}: sendVerificationEmailProps) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 587,
    secure: false,
    auth: {
      user: MY_EMAIL,
      pass: MY_EMAIL_PASSWORD,
    },
  });

  const emailHtml = render(VerifyEmail({ token, name: reserverName}));

  const options = {
    from: MY_EMAIL,
    to: reserverEmail,
    subject: subject,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
  } catch (error: any) {
    return error.message;
  }
};
