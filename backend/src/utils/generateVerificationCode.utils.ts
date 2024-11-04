import otpGenerator from "otp-generator";
const generateVerificationCode = (length:number): string => {
  const verificationCode = otpGenerator.generate(length, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return verificationCode;
};

export default generateVerificationCode;