import mongoose, { Schema } from "mongoose";
import TOrder from "../utils/types/TOrder.utils";

interface IOrder extends TOrder, Document {}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Generate a unique order number
OrderSchema.pre<IOrder>("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = "ORD-" + Date.now().toString(); // Example: ORD-1685098765432
  }
  next();
});

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel