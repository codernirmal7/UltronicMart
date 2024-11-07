import { Router } from "express";
import { addToCart, getProducts, searchProducts } from "../controllers/product.controllers";
import { purchaseProduct } from "../controllers/purchase.controller";

const productRouter = Router()

productRouter.route("/get").get(getProducts)
productRouter.route("/query").get(searchProducts)

productRouter.route("/purchase").post(purchaseProduct)

productRouter.route("/addToCart").post(addToCart)

export default productRouter