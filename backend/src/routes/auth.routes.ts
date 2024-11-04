import express, { Router } from "express"
import { resendVerificationCode, signUp, verifyEmail } from "../controllers/auth.controllers";

const authRouter:Router = Router()

authRouter.route("/sign-up").post(signUp);
authRouter.route("/verify").post(verifyEmail);
authRouter.route("/resend-verification").post(resendVerificationCode);

export default authRouter