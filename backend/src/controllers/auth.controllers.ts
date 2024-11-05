import { Request, Response } from "express";
import UserModel from "../models/user.model";
import {
  sendResetPasswordSuccessfulEmail,
  sendResetPasswordVerificationCode,
  sendVerificationEmailCode,
  sendWelcomeBackEmail,
} from "../nodemailer/email.nodemailer";
import generateVerificationCode from "../utils/generateVerificationCode.utils";
import bcrypt from "bcrypt";
import generateAccessToken from "../utils/generateAccessToken.utils";


//sign-up
const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Confirm password do not match with the password." });
    return;
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
      return;
    }

    const newUser = new UserModel({
      email,
      password,
      confirmPassword,
      emailVerifiedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newUser.save();

    // Generate a verification token
    const verificationToken = generateVerificationCode(6);
    newUser.verificationToken = verificationToken;
    newUser.verificationTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour expiration
    await newUser.save();

    // Send verification email
    await sendVerificationEmailCode(newUser.email, verificationToken);

    res.status(201).json({
      message: "User registered successfully. Check your email to verify.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing up user.", error });
  }
};

// Verify email function
const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const email = req.query.email;
  const codeUrl = req.query.code;
  const { code } = req.body;

  if (!email) {
    res.status(400).json({
      success: false,
      error: "Email is required.",
      statusCode: 400,
    });
    return;
  }

  if (!code && !codeUrl) {
    res.status(400).json({
      success: false,
      error: "Verification code is required.",
      statusCode: 400,
    });
    return;
  }

  try {
    const user = await UserModel.findOne({
      verificationToken: code || codeUrl,
      verificationTokenExpiresAt: { $gt: new Date() }, // Check if the token is not expired
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid or expired verification code." });
      return;
    }

    user.emailVerifiedAt = new Date();
    user.verificationToken = null; // Clear the token
    user.verificationTokenExpiresAt = null; // Clear the expiration
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying email.", error });
  }
};


//resendVerificationCode
const resendVerificationCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  const email = req.query.email;

  if (!email) {
    res.status(400).json({ message: "Please enter your email address." });
    return;
  }
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid user." });
      return;
    }

    if (user.emailVerifiedAt) {
      res
        .status(400)
        .json({ message: "Your email address has already been verified." });
      return;
    }

    const verificationCode = generateVerificationCode(6);

    user.verificationToken = verificationCode;
    (user.verificationTokenExpiresAt = new Date(Date.now() + 3600000)), //1 hours
      await user.save();

    await sendVerificationEmailCode(email.toString(), verificationCode);

    res.status(200).json({ message: "Email verification mail was sent." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


//sign-in

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password, ipAddress, userAgent } = req.body;

  //validation
  if (!email) {
    res.status(400).json({ message: "Please enter your email address." });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Please enter your password." });
    return;
  }

  if (!ipAddress || !userAgent) {
    res.status(400).json({ message: "something is missing." });
    return;
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid user." });
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.status(400).json({ message: "Email or password is invalid." });
      return;
    }

    if (user.accountDisabledAt) {
      res.status(400).json({
        message:
          "There is unusual activity on your account. It has been disabled",
      });
      return;
    }

    if (!user.emailVerifiedAt) {
      // Generate a verification token
      const verificationToken = generateVerificationCode(6);
      user.verificationToken = verificationToken;
      user.verificationTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour expiration
      await user.save();

      // Send verification email
      await sendVerificationEmailCode(user.email, verificationToken);

      res.status(400).json({
        message:
          "Please verify your email before logging in. Verification code has been sent.",
      });
      return;
    }

    user.lastTimeSignIn = new Date();
    user.save();

    sendWelcomeBackEmail(
      user.email,
      ipAddress,
      userAgent,
      user.email.split("@")[0]
    );

    res.cookie(
      "accessToken",
      generateAccessToken(
        user._id,
        user.email,
        user.lastTimeSignIn,
        user.createdAt
      ),
      {
        httpOnly: true,
        maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000, //7days
      }
    );

    res
      .status(200)
      .json({ message: "Sign In successful. Redirecting to the home page" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//forget-password
const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  //validation
  if (!email) {
    res.status(400).json({ message: "Please enter your email address." });
    return;
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid user." });
      return;
    }

    if (user.accountDisabledAt) {
      res.status(400).json({
        message:
          "There is unusual activity on your account. It has been disabled",
      });
      return;
    }

    const resetPasswordVerificationCode = generateVerificationCode(25);

    user.resetPasswordToken = resetPasswordVerificationCode;
    user.resetPasswordTokenExpiresAt = new Date(Date.now() + 3600000); //1 hours
    await user.save();

    sendResetPasswordVerificationCode(
      email,
      resetPasswordVerificationCode,
      user.email.split("@")[0]
    );

    res.status(200).json({ message: "Email sent successfully Go and reset the password." });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};


//reset-password
const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { password, confirmPassword } = req.body;
  const resetPasswordToken = req.params.token;

  //validation
  if(!password){
    res.status(400).json({ message: "Please enter your new password" });
    return;
  }
  if(password.length < 8 || password.length > 100){
    res.status(400).json({ message: "Password length must be greater then 8 and less than 100" });
    return;
  }

  if(confirmPassword !== password){
    res.status(400).json({ message: "Confirm password do not match with the password." });
    return;
  }

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: resetPasswordToken.split(":")[1],
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if(!user){
      res.status(400).json({ message: "Invalid or expired link." });
      return;
    }

    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiresAt = null;

    user.password = password;

    await user.save()

    sendResetPasswordSuccessfulEmail(user.email,  user.email.split("@")[0]);

    res.status(200).json({ message: "Password reset successful." });


  } catch (error) {
    res.status(500).json({ message: error });
  }

};

export { signUp, verifyEmail, resendVerificationCode, signIn, forgetPassword , resetPassword };