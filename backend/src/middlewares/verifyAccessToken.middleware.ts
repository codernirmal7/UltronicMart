import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { UserData } from "../utils/types/express";

const verifyToken = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  const token = req.cookies.accessToken;
  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

  // validation
  if (!token) {
     res.status(404).json({ message: "Token not Found." }); // Add `return` here
     return;
  }
  if (!JWT_PRIVATE_KEY) {
     res.status(404).json({ message: "JWT_PRIVATE_KEY is not defined." }); // Add `return` here
     return;
  }

  try {
    const decodeToken = jwt.verify(token, JWT_PRIVATE_KEY);
    req.userData = decodeToken as UserData; // Store decoded token in request
    next();
  } catch (error : unknown) {
    console.log("Error while verifying Token:", error);
     res
      .status(500)
      .json({ message: error || "Internal Server Error" }); // Add `return` here
  }
};

export default verifyToken;