import { Router } from "express";
import { getUserOrderDetail } from "../controllers/order.controllers";

const orderRouter = Router()

orderRouter.route("/get").get(getUserOrderDetail)

export default orderRouter