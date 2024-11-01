import express from "express"
import cors from "cors"

const app = express()

const corsOptions = {
    origin: "*", //It's means all website can access this server . Allowed origins
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],// Allowed headers
};

app.use(cors(corsOptions))

app.use(express.json())

export default app