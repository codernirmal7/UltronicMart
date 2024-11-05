import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken"
import "dotenv/config"


const generateAccessToken = (_id : ObjectId | unknown, _email : string , _lastTimeSignIn :Date, _accountCreatedAt : Date) :string=> {
    const payload = {
      id: _id,
      email: _email,
      lastTimeSignIn: _lastTimeSignIn,
      accountCreatedAt: _accountCreatedAt,
      
    };
  
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new Error("JWT_PRIVATE_KEY is not defined");
    }
  
    try {
      return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "7d" });
    } catch (error) {
      throw new Error("Error generating access token");
    }
  };

export default generateAccessToken