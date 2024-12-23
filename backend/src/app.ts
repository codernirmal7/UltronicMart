import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes";
import cookieParser from 'cookie-parser';
import productRouter from "./routes/product.routes";
import adminRouter from "./routes/admin.routes";
import orderRouter from "./routes/order.routes";


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "https://ultronic-mart.netlify.app", // Your frontend domain
    credentials: true, // Allows cookies to be sent
};
app.use(cookieParser());
app.use(cors(corsOptions))

app.use(express.static("public"))
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/order",orderRouter)

export default app