import {
  EMAIL_VERIFICATION_TEMPLATE,
  ORDER_CONFIRMATION_TEMPLATE,
  RESET_PASSWORD_SUCCESS_TEMPLATE,
  RESET_PASSWORD_TEMPLATE,
  WELCOME_BACK_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.nodemailer";
import { transporter } from "./nodemailer.config";
import "dotenv/config";

const sender: string | undefined = process.env.NODEMAILER_EMAIL;

if (!sender) {
  throw new Error("Sender email is not provided.");
}

const sendVerificationEmailCode = async (
  email: string,
  verificationCode: string
) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Verify your email",
    html: EMAIL_VERIFICATION_TEMPLATE(
      verificationCode,
      `${process.env.FRONTSIDE_URL}/auth/verify?email=${email}&code=${verificationCode}`
    ),
    category: "Email Verification",
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`An error occured : ${error}`);
  }
};

const sendWelcomeEmail = async (email: string) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Welcome to Ultronic Mart!",
    html: WELCOME_EMAIL_TEMPLATE(`${process.env.FRONTSIDE_URL}`),
    category: "Welcome Email",
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`An error occured : ${error}`);
  }
};

const sendWelcomeBackEmail = async (
  email: string,
  ipAddress: string,
  userAgent: string,
  name: string
) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Welcome Back!",
    html: WELCOME_BACK_EMAIL_TEMPLATE(
      name,
      ipAddress,
      userAgent,
      `${process.env.FRONTSIDE_URL}`,
      `${process.env.FRONTSIDE_URL}/contact`
    ),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`An error occured : ${error}`);
  }
};

const sendResetPasswordVerificationCode = async (
  email: string,
  resetPasswordToken: string,
  name: string
) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Reset Password",
    html: RESET_PASSWORD_TEMPLATE(
      `${process.env.FRONTSIDE_URL}/auth/reset-password/${resetPasswordToken}`,
      name
    ),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`An error occured : ${error}`);
  }
};

const sendResetPasswordSuccessfulEmail = async (
  email: string,
  name: string
) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Reset Password Successful",
    html: RESET_PASSWORD_SUCCESS_TEMPLATE(
      name,
      `${process.env.FRONTSIDE_URL}/sign-in`
    ),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`An error occured : ${error}`);
  }
};

const sendOrderConfirmationEmail = async (
  email: string,
  name: string,
  orderNumber: string,
  orderDate: Date,
  address: string,
  totalAmount: number,
) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Order confirmation",
    html: ORDER_CONFIRMATION_TEMPLATE(
      name,
      orderNumber,
      orderDate,
      address,
      totalAmount,
      `${process.env.FRONTSIDE_URL}/contact`,
      `${process.env.FRONTSIDE_URL}/orderd-history?id=${orderNumber}`
    ),
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`An error occured : ${error}`);
  }
};

export {
  sendVerificationEmailCode,
  sendWelcomeEmail,
  sendWelcomeBackEmail,
  sendResetPasswordVerificationCode,
  sendResetPasswordSuccessfulEmail,
  sendOrderConfirmationEmail
};
