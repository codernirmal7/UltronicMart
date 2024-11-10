import { cn } from "@/lib/utils";
import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label";
import brandName from "@/constant/BrandName";
import { FormEventHandler, useState } from "react";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { useDispatch } from "react-redux";
import { signUpAuth } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate()
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState({
    show: false,
    message: '',
  });
  const [isShowErrorAlert, setIsShowErrorAlert] = useState<{
    show: boolean;
    message: string | null;
  }>({
    show: false,
    message: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const signUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setIsShowErrorAlert({
        show: true,
        message: 'Confirm password does not match with the password',
      });
      return;
    }

    try {
      // Dispatch the signUp action and unwrap the result
      await dispatch(signUpAuth({ email, password, confirmPassword })).unwrap();

      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: 'User registered successfully. Check your email to verify.',
      });
      navigate(`/verify?email=${email}`, { replace: true });

      // Optionally, handle navigation or form reset here
    } catch (error: unknown) {
      // Handle error in case of failure
      console.log('Sign up failed:', error);

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
          Welcome to {brandName}
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Create a new account by entering email, password and confirm password
        </p>

        <form className="my-8" onSubmit={signUp}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn bg-primary/75 hover:bg-primary dark:hover:bg-primary block dark:bg-primary/75 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="flex items-center gap-2 mt-4">
            <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
              Already have an account?
            </p>
            <a
              href="#signin"
              className="font-medium text-primary hover:underline"
            >
              Sign In
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
