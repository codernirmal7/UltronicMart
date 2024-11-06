import mongoose from "mongoose";

// type for a purchased product
type TPurchase = {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    purchaseDate: Date;
}

// type for a purchased product
type TCart = {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    cartAddedDate: Date;
}

type TUser = {
    email: string;
    password: string;
    confirmPassword: string;
    emailVerifiedAt : Date | null;
    purchaseHistory: TPurchase[];
    cart : TCart[];
    lastTimeSignIn : Date;
    accountDisabledAt? : Date | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | null;
    verificationToken?: string | null;
    verificationTokenExpiresAt?: Date | null;
    adminAt : Date | null;
    createdAt: Date;
    updatedAt: Date;
} 

export default TUser