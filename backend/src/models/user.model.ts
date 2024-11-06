import mongoose, { Document, Schema } from "mongoose";
import TUser from "../utils/types/TUser.types";
import bcrypt from "bcrypt";
import "dotenv/config"

interface IUser extends TUser, Document {}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      minLength: [8, "Password must be greater than 8 length"],
      maxLength: [100, "Password must be less than 100 length"],
      required: [true, "Please enter a password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please enter a confirm password"],
    },
    purchaseHistory: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        purchaseDate: { type: Date, default: Date.now },
      },
    ],
    adminAt : {
      type : Date,
      default : null
    },
    emailVerifiedAt: { type: Date, default: null },
    lastTimeSignIn: { type: Date , default : null },
    accountDisabledAt: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordTokenExpiresAt: { type: Date, default: null },
    verificationToken: { type: String, default: null },
    verificationTokenExpiresAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is modified
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword,
    this.confirmPassword = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});


// Create the model
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;