import { EMAIL_VERIFICATION_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.nodemailer";
import { transporter } from "./nodemailer.config";
import "dotenv/config"

const sender:string | undefined = process.env.NODEMAILER_EMAIL;

if(!sender){
    throw new Error("Sender email is not provided.")
}

const sendVerificationEmailCode = async (email:string, verificationCode:string) =>  {
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
      throw new Error(`An error occured : ${error}`)
    }
};

const sendWelcomeEmail = async (email:string) =>  {
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
      throw new Error(`An error occured : ${error}`)
    }
};

export {sendVerificationEmailCode , sendWelcomeEmail}