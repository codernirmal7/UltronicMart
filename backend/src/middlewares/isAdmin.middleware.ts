import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.query.requestBy;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "You must be sign up before doing this." });
      return;
    }
    if (!user?.adminAt) {
      res.status(400).json({ message: "Your are not an admin." });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};