import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { addProduct, deleteProduct, updateProduct } from "../controllers/admin.controllers";
import { upload } from "../middlewares/multer.middleware";

const adminRouter = Router()

adminRouter.route("/product/add").post(isAdmin,upload.array("images",5),addProduct)
adminRouter.route("/product/delete").get(isAdmin,deleteProduct)

adminRouter.route("/product/update").post(isAdmin,upload.array("images",5),updateProduct)

export default adminRouter