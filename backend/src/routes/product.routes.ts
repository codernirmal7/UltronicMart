import { Router } from "express";
import { getAllProducts, searchProducts } from "../controllers/product.controllers";

const productRouter = Router()

productRouter.route("/get-all").get(getAllProducts)
productRouter.route("/query").get(searchProducts)

export default productRouter