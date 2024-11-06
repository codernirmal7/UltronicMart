import { Request, Response } from "express";
import ProductModel from "../models/product.model";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    //fetch all products
    const products = await ProductModel.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  const { name, minPrice, maxPrice, size, color, rating } = req.query;

  let query: any = {};

  // Partial match for product name
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  //rating filter
  if (rating) {
    query.rating = { rating };
  }

  // Price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Size filter
  if (size) {
    query["variants.size"] = size;
  }

  // Color filter
  if (color) {
    query["variants.color"] = color;
  }

  try {
    const products = await ProductModel.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

export { getAllProducts, searchProducts };