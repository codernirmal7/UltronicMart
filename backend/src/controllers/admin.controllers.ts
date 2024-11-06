import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import fs from "fs";
import mongoose from "mongoose";

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


const deleteProduct = async (req : Request,res : Response) : Promise<void> =>{
  const productId = req.query.id;
  if (!productId) {
    res.status(400).json({ message: "Product ID is required." });
    return;
  }
  try {
    const product = await ProductModel.findOne({_id : productId})
    if(!product){
      res.status(404).json({ message: "Product not found." });
    }
    await product?.deleteOne();
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting products", error : error });
  }
}

export { addProduct , deleteProduct };