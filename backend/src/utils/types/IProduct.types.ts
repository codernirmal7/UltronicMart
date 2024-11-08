import mongoose, { Document } from "mongoose";

// Interface for a product variant
interface IVariant {
  size?: string;
  color?: string;
  additionalPrice?: number; // For price difference by variant
}

// Interface for a product review
interface IReview {
  userId: mongoose.Schema.Types.ObjectId;
  email: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  purchaseCount: number;
  stock: number;
  variants?: IVariant[];
  images: string[];
  rating?: number;
  reviews?: IReview[];
  createdAt: Date;
  updatedAt: Date;
}