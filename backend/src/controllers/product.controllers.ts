import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";

const getProducts = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    if (id) {
      const product = await ProductModel.find({ _id: id });
      res.status(200).json({ product });
      return;
    }
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

const addToCart = async (req: Request, res: Response): Promise<void> => {
  const { productId, quantity } = req.body;
  if (!productId) {
    res.status(500).json({ message: "Product id is required." });
    return;
  }
  if (!quantity) {
    res.status(500).json({ message: "Quantity id is required." });
    return;
  }
  try {
    // Update user's purchase history
    await UserModel.findByIdAndUpdate(productId, {
      $push: {
        cart: {
          productId,
          quantity,
          cartAddedDate: new Date(),
        },
      },
    });

    res.status(200).json({ message: "Product added successful." });
    return;
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getProducts, searchProducts, addToCart };
