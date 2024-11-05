import express, { Router } from "express";
import {
  forgetPassword,
  resendVerificationCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from "../controllers/auth.controllers";

const authRouter: Router = Router();

//sign up parts routes
authRouter.route("/sign-up").post(signUp);
authRouter.route("/verify").post(verifyEmail);
authRouter.route("/resend-verification").post(resendVerificationCode);

//sign in parts routes
authRouter.route("/sign-in").post(signIn);
authRouter.route("/forget-password").post(forgetPassword);
authRouter.route("/reset-password/:token").post(resetPassword);

authRouter.route("/sign-out").post(signOut);

export default authRouter;