import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import VerifyEmail from "./VerifyEmail.tsx";
import UserCredentialsEmail from "./UserCredentialsEmail.tsx";
import OptPassword from "./OptPassword.tsx";
import type { ZodRoleType } from "../zod/moduleSchema.ts";

type sendVerificationEmailProps = {
    reserverEmail: string;
    token: string;
    reserverName: string;
}

const MY_EMAIL = Bun.env.MY_EMAIL || process.env.MY_EMAIL;
const MY_EMAIL_PASSWORD = Bun.env.MY_EMAIL_PASSWORD || process.env.MY_EMAIL_PASSWORD;

// Send email verification
export const sendVerificationEmail = async ({
  reserverEmail,
  token,
  reserverName,
}: sendVerificationEmailProps): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: MY_EMAIL,
      pass: MY_EMAIL_PASSWORD,
    },
  });

  const emailHtml = render(VerifyEmail({ token, name: reserverName }));

  const options = {
    from: MY_EMAIL,
    to: reserverEmail,
    subject: "Verify your email address",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
    return true;
  } catch (error: any) {
    return false;
  }
};


// send user credentials email
type sendUserCredentialsEmailProps = {
    reserverEmail: string;
    reserverName: string;
    password: string;
    role: ZodRoleType
};

export const sendUserCredentialsEmail = async ({
  reserverEmail,
  reserverName,
  password,
  role,
}: sendUserCredentialsEmailProps): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: MY_EMAIL,
      pass: MY_EMAIL_PASSWORD,
    },
  });

  const emailHtml = render(UserCredentialsEmail({ name: reserverName, password, email: reserverEmail, role }));

  const options = {
    from: MY_EMAIL,
    to: reserverEmail,
    subject: "Your login credentials",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
    return true
  } catch (error: any) {
    return false;
  }
};


// send OTP email
type sendOTPEmailProps = {
    reserverEmail: string;
    reserverName: string;
    OPT: number;
};

export const sendOTPEmail = async ({
  reserverEmail,
  reserverName,
  OPT,
}: sendOTPEmailProps): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: MY_EMAIL,
      pass: MY_EMAIL_PASSWORD,
    },
  });

  const emailHtml = render(OptPassword({ name: reserverName, OPT }));

  const options = {
    from: MY_EMAIL,
    to: reserverEmail,
    subject: "Your One Time Password (OTP)",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(options);
    return true;
  } catch (error: any) {
    return false;
  }
};

