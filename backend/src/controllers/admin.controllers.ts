import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

const addProduct = async (req: Request, res: Response): Promise<void> => {
  //get the products details from frontend
  const { name, description, category, price, stock, size, color, rating } =
    req.body;

  let images: string[] = [];

  // If files were uploaded, map through each file and save its path in the images array
  if (req.files) {
    images = (req.files as Express.Multer.File[]).map((file) => file.path);
  }

  try {
    const product = await ProductModel.findOne({ name });

    if (product?.name == name) {
      for (let i = 0; i < images.length; i++) {
        fs.unlinkSync(images[i]);
      }
      res
        .status(400)
        .json({ message: "Product is exists but You can increase stocks." });
      return;
    }
    const newProduct = new ProductModel({
      name,
      description,
      category,
      price,
      images,
      stock,
      variants: {
        size,
        color,
        stock,
      },
      rating,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while adding product.", error });
    for (let i = 0; i < images.length; i++) {
      fs.unlinkSync(images[i]);
    }
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.query.id;
  if (!productId) {
    res.status(400).json({ message: "Product ID is required." });
    return;
  }
  try {
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }
    await product?.deleteOne();
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting products", error: error });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    description,
    category,
    price,
    stock,
    variants,
    rating,
    imageUrl, // For deleting image
  } = req.body;
  const productId = req.query.id;

  try {
    // Check if the product exists before trying to update
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Prepare update data
    const updateData: any = {};

    // Set the fields based on the request body, only if they are provided
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (variants) updateData.variants = variants; // Handle the variants array (if provided)
    if (rating !== undefined) updateData.rating = rating;

    // If imageUrl is provided, delete the existing image
    if (imageUrl) {
      const filePath = imageUrl; // Correct path
      try {
        // Delete the old image file
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          res.status(404).json({ message: `File not found: ${filePath}` });
        }
      } catch (err) {
        res.status(500).json({ message: `Error deleting file:', ${err}` });
      }
    }
    // Handle image update if new images are uploaded
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // Assuming `req.files` contains the uploaded images (it will be an array)
      const imageUrls = req.files.map(
        (file: Express.Multer.File) => "public/productImages" + file.filename
      );
      updateData.images = imageUrls;
    }

    // Update the product
    const updatedProduct = await ProductModel.updateOne(
      { _id: productId },
      { $set: updateData }
    );

    if (updatedProduct.modifiedCount === 0) {
      res.status(400).json({ message: "No changes were made to the product" });
      return;
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating product", error });
  }
};

export { addProduct, deleteProduct, updateProduct };