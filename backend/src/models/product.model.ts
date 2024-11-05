import mongoose, { Schema } from "mongoose";
import { IProduct } from "../utils/types/IProduct.types";

const ProductSchema: Schema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    purchaseCount: { type: Number, default: 0 }, // Total purchases
    stock: { type: Number, required: true },
    variants: [
      {
        size: { type: String },
        color: { type: String },
        stock: { type: Number, default: 0 },
        additionalPrice: { type: Number, default: 0 },
      },
    ],
    images: [{ type: String, required: true }], // URLs for images
    rating: { type: Number, default: 0 },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        email: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel