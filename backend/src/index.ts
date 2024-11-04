import app from "./app.ts";
import connectionMongoDB from "./db/connectionMongo.db";
import "dotenv/config"

const PORT = process.env.PORT || 3000;//set default if port not defined

connectionMongoDB().then(()=>{
    //listen the server when db connected successful.
    app.listen(PORT,()=>{
        console.log("Server is running on" , PORT)
    })
}).catch(()=>{
    //log the error when failed
    console.log("Failed to connect to MongoDB")
})