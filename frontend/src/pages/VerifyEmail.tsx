import { AppDispatch } from "@/redux";
import {  verifyEmailAuth } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const location = useLocation();

  // Create a URLSearchParams instance from the query string
  const queryParams = new URLSearchParams(location.search);

   // Extract the 'email' and the code parameter from the query string
   const email = queryParams.get('email') as string;
   const verificationCode = queryParams.get('code') as string;
  
  const verifyEmail = async () => {   
    try {
      // Dispatch the verify Email action and unwrap the result
      await dispatch(verifyEmailAuth({ code : verificationCode , email })).unwrap();

      // On success;
      alert("Email verified successful.")
      navigate(`/auth`, { replace: true });

      // Optionally, handle navigation or form reset here
    } catch (error: unknown) {
       // Handle error in case of failure
       console.log("Sign up failed:", error);
       // Check if the error is a string (rejectWithValue string) or an error object
       if (typeof error === "string") {
        alert(error)
       } else if (error instanceof Error) {
         // If it's an instance of Error, use the message property
         alert(error.message)
       } else {
         // Fallback case for unexpected error shapes
         alert("An unexpected error occurred.")
       }
      }
  };

  useEffect(()=>{
    verifyEmail()
  },[])

  return (
    <></>
  );
}