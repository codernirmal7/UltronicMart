import { Router } from "express";
import { getAllProducts, searchProducts } from "../controllers/product.controllers";
import { purchaseProduct } from "../controllers/purchase.controller";

const productRouter = Router()

productRouter.route("/get-all").get(getAllProducts)
productRouter.route("/query").get(searchProducts)

productRouter.route("/purchase").post(purchaseProduct)

export default productRouter