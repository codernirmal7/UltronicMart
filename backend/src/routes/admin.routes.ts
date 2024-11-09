import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { addProduct, deleteProduct, deleteUser, getAllUserData, getOrderDetails, updateProduct, updateUserData } from "../controllers/admin.controllers";
import { upload } from "../middlewares/multer.middleware";

const adminRouter = Router()

adminRouter.route("/product/add").post(isAdmin,upload.array("images",5),addProduct)
adminRouter.route("/product/delete").get(isAdmin,deleteProduct)

adminRouter.route("/product/update").post(isAdmin,upload.array("images",5),updateProduct)

adminRouter.route("/user/get-all").get(isAdmin,getAllUserData)
adminRouter.route("/user/update").post(isAdmin,updateUserData)
adminRouter.route("/user/delete").get(isAdmin,deleteUser)

adminRouter.route("/order-detail/get").get(isAdmin,getOrderDetails)


export default adminRouter