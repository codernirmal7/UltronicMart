import mongoose from "mongoose";

type TOrderProduct = {
  productId: mongoose.Schema.Types.ObjectId; // Reference to Product
  quantity: number;
  
}

type TOrder = {
  orderNumber: string;
  userId: mongoose.Schema.Types.ObjectId; // Reference to User
  products: TOrderProduct[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled"; // Order status
  createdAt: Date;
  updatedAt: Date;
}


export default TOrder