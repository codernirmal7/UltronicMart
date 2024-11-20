import { Router } from "express";
import { addToCart, comment, decreaseQuantityOfProduct, getProducts, removeProductFromCart, searchProducts } from "../controllers/product.controllers";
import { purchaseProduct } from "../controllers/purchase.controller";

const productRouter = Router()

productRouter.route("/get").get(getProducts)
productRouter.route("/query").get(searchProducts)

productRouter.route("/purchase").post(purchaseProduct)

productRouter.route("/addToCart").post(addToCart)

productRouter.route("/comment").post(comment)

productRouter.route("/remove").post(removeProductFromCart)

productRouter.route("/quantity-decrease").post(decreaseQuantityOfProduct)

export default productRouter