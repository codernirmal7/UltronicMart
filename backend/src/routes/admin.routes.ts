import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { addProduct } from "../controllers/admin.controllers";
import { upload } from "../middlewares/multer.middleware";

const adminRouter = Router()

adminRouter.route("/product/add").post(isAdmin,upload.array("images",5),addProduct)

export default adminRouter