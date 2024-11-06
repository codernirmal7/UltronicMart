import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes";
import cookieParser from 'cookie-parser';
import productRouter from "./routes/product.routes";
import adminRouter from "./routes/admin.routes";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*", //It's means all website can request to this server . Allowed origins
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],// Allowed headers
};
app.use(cookieParser());
app.use(cors(corsOptions))

app.use(express.static("public"))
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/admin",adminRouter)

export default app