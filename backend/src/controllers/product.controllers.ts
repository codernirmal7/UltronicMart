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
  const { productId, quantity, userId } = req.body;

  // Validate productId and quantity
  if (!productId) {
    res.status(400).json({ message: "Product id is required." });
    return;
  }
  if (!quantity || quantity <= 0) {
    res.status(400).json({ message: "Quantity must be a positive number." });
    return;
  }

  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Find the product by productId
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    // Check if the product is already in the user's cart
    const existingProductIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (existingProductIndex !== -1) {
      // If product is already in cart, update the quantity
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      // If product is not in cart, add new product entry
      user.cart.push({
        productId,
        quantity,
        cartAddedDate: new Date(),
      });
    }

    // Save the updated cart
    await user.save();

    res.status(200).json({ message: "Product added to cart successfully." });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding product to cart." });
  }
};


const removeProductFromCart = async (req: Request, res: Response): Promise<void> => {
  const { productId , userId } = req.body;
  if (!productId) {
    res.status(500).json({ message: "Product id is required." });
    return;
  }
  try {
     // Find the user by userId
     const user = await UserModel.findById(userId);
     if (!user) {
       res.status(404).json({ message: "User not found." });
       return;
     }

     // Check if the product exists in the cart
    const productIndex = user.cart.findIndex((item) => item.productId.toString() === productId);

    if (productIndex === -1) {
      res.status(404).json({ message: "Product not found in cart." });
      return;
    }

      // Remove the product from the cart
      user.cart.splice(productIndex, 1);

      // Save the updated user document
      await user.save();

      res.status(200).json({ message: "Product removed from cart successfully." });

    res.status(200).json({ message: "Product added successful." });
    return;
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export { getProducts, searchProducts, addToCart , removeProductFromCart  };
