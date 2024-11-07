import { Request, Response } from "express";
import Stripe from "stripe";
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";
import OrderModel from "../models/OrderSchema.model";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

const purchaseProduct = async (req: Request, res: Response): Promise<void> => {
  const { quantity, userId, paymentMethodId } = req.body;
  const productId = req.query.productId;

  try {
    // Find the product
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    if (product.stock < quantity) {
      res.status(400).json({ message: "Insufficient stock" });
      return;
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create a Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Convert amount to cents for Stripe
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true, // Immediately confirm the payment
    });

    // Handle successful payment
    if (paymentIntent.status === "succeeded") {
      // Deduct stock and update purchase count
      product.stock -= quantity;
      product.purchaseCount += quantity;
      await product.save();

      // Update user's purchase history
      await UserModel.findByIdAndUpdate(userId, {
        $push: {
          purchaseHistory: {
            productId,
            quantity,
            purchaseDate: new Date(),
          },
        },
      });

      // Create a new order in the Order collection
      const order = new OrderModel({
        orderNumber: 'ORD-' + Date.now().toString(), // Generate unique order number
        userId: userId,
        products: [
          {
            productId: product._id,
            name: product.name,
            quantity: quantity,
            price: product.price,
          },
        ],
        totalAmount: totalPrice,
        status: "completed",
      });

      await order.save(); // Save order to the database

      res.status(200).json({ message: "Purchase successful", paymentIntent, order });
      return;
    } else {
      res.status(400).json({ message: "Payment failed" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing purchase", error });
  }
};

export { purchaseProduct };
