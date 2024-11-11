import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAuth } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux";
import { FaEnvelope } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type SignUpProps = {
  isSignInState: string;
  toggleForm: () => void;
  setIsShowErrorAlert: any;
  setIsShowSuccessAlert: any;
};

const Signup: React.FC<SignUpProps> = ({
  isSignInState,
  toggleForm,
  setIsShowErrorAlert,
  setIsShowSuccessAlert,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [iconEye, setIconEye] = useState<string>("eye-slash");
  const [typeOfPassword, setTypeOfPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const signUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setIsShowErrorAlert({
        show: true,
        message: "Confirm password does not match with the password",
      });
      return;
    }

    try {
      // Dispatch the signUp action and unwrap the result
      await dispatch(signUpAuth({ email, password, confirmPassword })).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: "User registered successfully. Check your email to verify.",
      });

      // Optionally, handle navigation or form reset here
    } catch (error: unknown) {
      // Handle error in case of failure
      console.log("Sign up failed:", error);

      // Check if the error is a string (rejectWithValue string) or an error object
      if (typeof error === "string") {
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
    <div
      className={`w-full flex justify-center items-center transition-transform duration-500 ease-in-out absolute inset-0 ${
        isSignInState != "signUp"
          ? "opacity-0 scale-90 translate-x-[100%]"
          : "opacity-100 scale-100 translate-x-0"
      }`}
    >
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 ">
        <h2 className="font-bold text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-200">
          Create a new account.
        </h2>

        <form className="my-8" onSubmit={signUp}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="SignUpEmail">Email Address</Label>
            <Input
              id="SignUpEmail"
              placeholder="example@xyz.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-7 "
              rightIcon={
                <FaEnvelope
                  size={20}
                  className="absolute top-4 right-3 fill-primary/65"
                />
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="SignUpPassword">Password</Label>
            <Input
              id="SignUpPassword"
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
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
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
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="flex items-center gap-2 justify-center mt-5">
            <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
              Already have an account?
            </p>
            <a
              onClick={toggleForm}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

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

export default Signup;
