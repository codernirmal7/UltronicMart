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

    // Check if the product stock is available
    if (product.stock < quantity) {
      res
        .status(400)
        .json({ message: "Not enough stock available for this product." });
      return;
    }

    // Find if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // If product is already in cart, check if the requested quantity is within stock limits
      const newQuantity = user.cart[existingProductIndex].quantity + quantity;

      if (newQuantity > product.stock) {
        res.status(400).json({ message: "Cannot add more. Stock is limited." });
        return;
      }

      // Update the existing product quantity
      user.cart[existingProductIndex].quantity = newQuantity;
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
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart." });
  }
};

const decreaseQuantityOfProduct = async (req: Request, res: Response) => {
  const { cartProductId, userId } = req.body;
  if (!cartProductId) {
    res.status(400).json({ message: "Product id is required." });
    return;
  }
  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Find if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId.toString() === cartProductId
    );
    

    if (user.cart[existingProductIndex].quantity <= 1) {
      // Remove the product from the cart
      user.cart.splice(existingProductIndex, 1);
      await user.save();
      res
      .status(200)
      .json({ message: "Product quantity decrease in cart successfully." });
      return;
    }

    user.cart[existingProductIndex].quantity--;

    // Save the updated cart
    await user.save();

    res
      .status(200)
      .json({ message: "Product quantity decrease in cart successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart." });
  }
};

const removeProductFromCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId, userId } = req.body;
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
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      res.status(404).json({ message: "Product not found in cart." });
      return;
    }

    // Remove the product from the cart
    user.cart.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from cart successfully." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const comment = async (req: Request, res: Response): Promise<void> => {
  const { productId, email, rating, comment } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required." });
    return;
  }
  if (rating > 4 || rating < 0) {
    res.status(400).json({ message: "Rating must be 4 and not less than 0." });
    return;
  }
  if (comment.length < 3 || comment.length > 100) {
    res.status(400).json({
      message:
        "Comments must be 3 characters long and comments must be less than 100 characters.",
    });
    return;
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(500).json({ message: "Sorry, You can't comment." });
      return;
    }
    const product = await ProductModel.findByIdAndUpdate(productId, {
      $push: {
        reviews: {
          userId: user?._id,
          email,
          rating,
          comment,
          date: new Date(),
        },
      },
    });

    res.status(200).json({ message: "Comment added." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export {
  getProducts,
  searchProducts,
  addToCart,
  removeProductFromCart,
  comment,
  decreaseQuantityOfProduct,
};
