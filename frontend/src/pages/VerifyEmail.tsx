import ErrorAlert from "@/components/alerts/ErrorAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import { Input } from "@/components/ui/input";
import brandName from "@/constant/BrandName";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/redux";
import { ResendVerificationEmailAuth, verifyEmailAuth } from "@/redux/slices/authSlice";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isShowErrorAlert, setIsShowErrorAlert] = useState<{
    show: boolean;
    message: string | null;
  }>({
    show: false,
    message: "",
  });
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState({
    show: false,
    message: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  // Create a URLSearchParams instance from the query string
  const queryParams = new URLSearchParams(location.search);

   // Extract the 'email' parameter from the query string
   const email:string | null = queryParams.get('email');
  

  const verifyEmail: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
   
    try {
      // Dispatch the verify Email action and unwrap the result
      await dispatch(verifyEmailAuth({ code : verificationCode , email })).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: 'Email verified successfully!',
      });

      // Optionally, handle navigation or form reset here
    } catch (error: unknown) {
      // Handle error in case of failure
      console.log('Email verification failed:', error);

      // Check if the error is a string (rejectWithValue string) or an error object
      if (typeof error === 'string') {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        // If it's an instance of Error, use the message property
        setIsShowErrorAlert({
          show: true,
          message: error.message,
        });
      } else {
        // Fallback case for unexpected error shapes
        setIsShowErrorAlert({
          show: true,
          message: 'An unexpected error occurred.',
        });
      }
    }
  };

  const resendVerificationEmail= async () => {
    try {
      // Dispatch the verify Email action and unwrap the result
      await dispatch(ResendVerificationEmailAuth({ email })).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: 'Email verification mail was sent.',
      });

      // Optionally, handle navigation or form reset here
    } catch (error: unknown) {
      // Check if the error is a string (rejectWithValue string) or an error object
      if (typeof error === 'string') {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        // If it's an instance of Error, use the message property
        setIsShowErrorAlert({
          show: true,
          message: error.message,
        });
      } else {
        // Fallback case for unexpected error shapes
        setIsShowErrorAlert({
          show: true,
          message: 'An unexpected error occurred.',
        });
      }
    }
  };



  return (
    <div className="w-full h-screen flex justify-center items-center">
      <header className="w-full fixed top-0 p-4 flex items-center">
        <span className="text-xl font-bold uppercase text-primary">
          {brandName}
        </span>
      </header>
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white shadow-input dark:bg-black ">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Verify your email
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          After your email verified you can sign in
        </p>

        <form className="my-8" onSubmit={verifyEmail}>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="verificationCode">Enter verification code</Label>
            <Input
              id="verificationCode"
              placeholder="Code"
              type="text"
              required
              minLength={6}
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn bg-primary/75 hover:bg-primary dark:hover:bg-primary block dark:bg-primary/75 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Verify 
            <BottomGradient />
          </button>

          <div className="flex items-center gap-2 mt-4">
            <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
              Resend verification code mail?
            </p>
            <a
              onClick={resendVerificationEmail}
              className="font-medium text-primary hover:cursor-pointer"
            >
              send
            </a>
          </div>
        </form>
      </div>
      <SuccessAlert
        isShowSuccessAlert={isShowSuccessAlert}
        setIsShowSuccessAlert={setIsShowSuccessAlert}
      />
      <ErrorAlert
        isShowErrorAlert={isShowErrorAlert}
        setIsShowErrorAlert={setIsShowErrorAlert}
      />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
