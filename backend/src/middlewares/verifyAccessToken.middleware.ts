import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";

const verifyToken = async (req: Request, res: Response, next : NextFunction) => {
  const token = req.cookies.accessToken;
  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

  //validation
  if (!token) {
    res.status(404).json({ message: "Token not Found." });
  }
  if (!JWT_PRIVATE_KEY) {
    res.status(404).json({ message: "JWT_PRIVATE_KEY is not defined." });
  }

  try {
    const decodeToken = jwt.verify(token, JWT_PRIVATE_KEY);
    req.userData = decodeToken;
    next();
  } catch (error) {
    console.log("Error while verifying Token : ", Error);
    res.status(500).json({ message: error });
  }
};

export default verifyToken;