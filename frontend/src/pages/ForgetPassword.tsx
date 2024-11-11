import ErrorAlert from "@/components/alerts/ErrorAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import LogoNavbar from "@/components/Navbar/LogoNavbar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux";
import { forgetPasswordAuth } from "@/redux/slices/authSlice";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

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
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    if(auth.isLoggedIn){
      navigate(`/`, { replace: true });
    }
  },[auth.isLoggedIn])

  const handelForgetPassword: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      await dispatch(forgetPasswordAuth({ email })).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: "Mail sent successfully Go and reset the password.",
      });
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
  return (
    <>
      <LogoNavbar />
      <div
        className={`w-full h-screen flex justify-center items-center transition-transform duration-500 ease-in-out mt-10 lg:mt-5`}
      >
        <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 ">
          <h2 className="font-extrabold text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-200">
            Forget your password.
          </h2>

          <form className="my-8" onSubmit={handelForgetPassword}>
            {/* Email Input */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="forgetPasswordEmail">Email Address</Label>
              <Input
                id="forgetPasswordEmail"
                placeholder="example@xyz.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-7"
                rightIcon={
                  <FaEnvelope
                    size={20}
                    className="absolute top-4 right-3 fill-primary/65"
                  />
                }
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn bg-primary/75 hover:bg-primary dark:hover:bg-primary block dark:bg-primary/75 w-full text-white rounded-full p-4 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Send request &rarr;
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
