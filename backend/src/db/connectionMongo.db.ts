import mongoose from "mongoose";
import "dotenv/config";

const connectionMongoDB = async () => {
    const uri = process.env.MONGO_DB_URI;

    if (!uri) {
        throw new Error("MONGO_DB_URI is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`An error occurred while connecting to MongoDB: ${error.message}`);
        } else {
            console.error("An unknown error occurred while connecting to MongoDB.");
        }
        throw new Error(`An error occurred: ${error}`);
    }
};

export default connectionMongoDB;