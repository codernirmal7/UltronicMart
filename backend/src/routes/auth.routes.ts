import express, { Router } from "express";
import {
  forgetPassword,
  resendVerificationCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
  verifyEmail,
  userData,
  loggedInMessage,
  getUserCartAndPaymentHistory
} from "../controllers/auth.controllers";
import verifyToken from "../middlewares/verifyAccessToken.middleware";

const authRouter: Router = Router();

//sign up parts routes
authRouter.route("/sign-up").post(signUp);
authRouter.route("/verify").post(verifyEmail);
authRouter.route("/resend-verification").post(resendVerificationCode);

//sign in parts routes
authRouter.route("/sign-in").post(signIn);
authRouter.route("/forget-password").post(forgetPassword);
authRouter.route("/reset-password/:token").post(resetPassword);

authRouter.route("/sign-out").get(signOut);
authRouter.route("/user-data").get(verifyToken, userData);
authRouter.route("/islogged-in").get(verifyToken,loggedInMessage)

authRouter.route("/user-activities").post(getUserCartAndPaymentHistory)

export default authRouter;