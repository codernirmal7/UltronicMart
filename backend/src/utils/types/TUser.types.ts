import mongoose from "mongoose";

// Interface for a purchased product
type IPurchase = {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    purchaseDate: Date;
}

type TUser = {
    email: string;
    password: string;
    confirmPassword: string;
    emailVerifiedAt : Date | null;
    purchaseHistory: IPurchase[];
    lastTimeSignIn : Date;
    accountDisabledAt? : Date | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | null;
    verificationToken?: string | null;
    verificationTokenExpiresAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
} 

export default TUser