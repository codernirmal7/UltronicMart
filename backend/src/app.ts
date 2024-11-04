import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*", //It's means all website can request to this server . Allowed origins
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],// Allowed headers
};

app.use(cors(corsOptions))
app.use("/api/v1/auth",authRouter)

export default app