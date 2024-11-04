type TUser = {
    email: string;
    password: string;
    confirmPassword: string;
    emailVerifiedAt : Date | null;
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