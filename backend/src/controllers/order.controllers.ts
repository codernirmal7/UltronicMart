import { Request, Response } from "express";
import OrderModel from "../models/OrderSchema.model";

const getUserOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(500).json({ message: "User Id is required." });
    return;
  }
  try {
    const orderDetails = await OrderModel.find(
      { userId },
      { __v: false, userId: false, updatedAt: false }
    );
    res.status(200).json({ message: orderDetails });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getUserOrderDetail };
