import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/redux";
import { signInAuth } from "@/redux/slices/authSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type SignInProps = {
  isSignInState: string;
  toggleForm: () => void;
  setIsShowErrorAlert: any;
  setIsShowSuccessAlert: any;
};
// SignIn Component
const Signin: React.FC<SignInProps> = ({
  isSignInState,
  toggleForm,
  setIsShowErrorAlert,
  setIsShowSuccessAlert,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userAgent, setUserAgent] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [iconEye, setIconEye] = useState<string>("eye-slash");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Get user agent and IP address on page load
  useEffect(() => {
    setUserAgent(navigator.userAgent);

    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        setIpAddress(response.data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }, []);

  // Form submit handler for sign in
  const signIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the signIn action with email, password, user agent, and IP address
      await dispatch(
        signInAuth({ email, password, userAgent, ipAddress })
      ).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: "Sign In successful. Redirecting to the home page....",
      });
      setTimeout(()=>{
        navigate(`/`, { replace: true });
      },2000)

      // Optionally, handle navigation or reset form here if needed
    } catch (error: unknown) {
      // Handle error in case of failure
      console.log("Sign in failed:", error);

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
    const input = document.getElementById("signInPassword") as HTMLInputElement;
    // Toggle password visibility
    if (iconEye == "eye") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }, [iconEye]);

  return (
    <div
      className={`w-full flex justify-center items-center transition-transform duration-500 ease-in-out absolute inset-0 ${
        isSignInState == "signIn"
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-90 translate-x-[-100%]"
      }`}
    >
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 ">
        <h2 className="font-bold text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-200">
          Sign in to you account.
        </h2>

        <form className="my-8" onSubmit={signIn}>
          {/* Email Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="signInEmail">Email Address</Label>
            <Input
              id="signInEmail"
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
            <p className="hidden peer-placeholder-shown:block text-red-500 text-sm mt-1">
              This field is required!
            </p>
          </LabelInputContainer>

          {/* Password Input */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="signInPassword">Password</Label>
            <Input
              id="signInPassword"
              placeholder="••••••••"
              type="text"
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

          <div className="w-full flex  mb-4">
            <a
              href="#forgetpassword"
              className="text-primary dark:text-gray-200 font-medium hover:underline"
            >
              Forget your password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            className="bg-gradient-to-br relative group/btn bg-primary/75 hover:bg-primary dark:hover:bg-primary block dark:bg-primary/75 w-full text-white rounded-full p-4 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign In &rarr;
            <BottomGradient />
          </button>

          <div className="flex items-center gap-2 justify-center mt-5">
            <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
              Don't have an account?
            </p>
            <a
              onClick={toggleForm}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

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

export default Signin;
