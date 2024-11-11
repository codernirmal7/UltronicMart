import ErrorAlert from "@/components/alerts/ErrorAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import LogoNavbar from "@/components/Navbar/LogoNavbar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux";
import { resetPasswordAuth } from "@/redux/slices/authSlice";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState({
    show: false,
    message: "",
  });
  const [isShowErrorAlert, setIsShowErrorAlert] = useState<{
    show: boolean;
    message: string | null;
  }>({
    show: false,
    message: "",
  });
  const [iconEye, setIconEye] = useState<string>("eye-slash");
  const [typeOfPassword, setTypeOfPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate()
  const {token} = useParams()
  const tokenUpdated = token?.split(":")[1] 

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    if(auth.isLoggedIn){
      navigate(`/`, { replace: true });
    }
  },[auth.isLoggedIn])

  const handelResetPassword: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();


    try {
      await dispatch(resetPasswordAuth({ password , confirmPassword , token : tokenUpdated})).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: "Password reset successful. Redirecting to the sign in page...",
      });
      setTimeout(()=>{
        navigate("/auth",{replace : true})
      },2000)
    } catch (error: unknown) {
      // Handle error in case of failure
      if (typeof error === "string") {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        setIsShowErrorAlert({
          show: true,
          message: error.message,
        });
      } else {
        setIsShowErrorAlert({
          show: true,
          message: "An unexpected error occurred.",
        });
      }
    }
  };


  // Show/Hide Password

  useEffect(() => {
    // Toggle password visibility
    if (iconEye == "eye") {
      setTypeOfPassword("text");
    } else {
      setTypeOfPassword("password");
    }
  }, [iconEye]);


  return (
    <>
      <LogoNavbar />
      <div
        className={`w-full h-screen flex justify-center items-center transition-transform duration-500 ease-in-out mt-10 lg:mt-5`}
      >
        <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 ">
          <h2 className="font-extrabold text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-200">
            Reset your password.
          </h2>

          <form className="my-8" onSubmit={handelResetPassword}>
            {/* Password Input */}
            <LabelInputContainer className="mb-4">
            <Label htmlFor="resetPassword">Password</Label>
            <Input
              id="resetPassword"
              placeholder="••••••••"
              type={typeOfPassword}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-7 "
              rightIcon={
                iconEye == "eye" ? (
                  <FaEye
                    size={20}
                    className="absolute top-4 right-3 fill-primary/65 cursor-pointer"
                    onClick={() => setIconEye("eye-slash")}
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    className="absolute top-4 right-3 fill-primary/65 cursor-pointer"
                    onClick={() => setIconEye("eye")}
                  />
                )
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="resetConfirmPassword">Confirm password</Label>
            <Input
              id="resetConfirmPassword"
              placeholder="••••••••"
              type={typeOfPassword}
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-7"
              rightIcon={
                iconEye == "eye" ? (
                  <FaEye
                    size={20}
                    className="absolute top-4 right-3 fill-primary/65 cursor-pointer"
                    onClick={() => setIconEye("eye-slash")}
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    className="absolute top-4 right-3 fill-primary/65 cursor-pointer"
                    onClick={() => setIconEye("eye")}
                  />
                )
              }
            />
          </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn bg-primary/75 hover:bg-primary dark:hover:bg-primary block dark:bg-primary/75 w-full text-white rounded-full p-4 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Reset password &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
      {/* Success and Error Alerts */}
      <SuccessAlert
        isShowSuccessAlert={isShowSuccessAlert}
        setIsShowSuccessAlert={setIsShowSuccessAlert}
      />
      <ErrorAlert
        isShowErrorAlert={isShowErrorAlert}
        setIsShowErrorAlert={setIsShowErrorAlert}
      />
    </>
  );
}

// Bottom gradient for the button hover effect
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Reusable container for label and input fields
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
