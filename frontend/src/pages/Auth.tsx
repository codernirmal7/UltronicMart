import ErrorAlert from "@/components/alerts/ErrorAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import LogoNavbar from "@/components/Navbar/LogoNavbar";
import Signin from "@/components/SignIn/Signin";
import Signup from "@/components/SignUp/Signup";
import { RootState } from "@/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

export default function Auth() {
  //define state varibale for switching one form to another
  const [isSignInState, setIsSignInState] = useState<string>("signIn");
  const navigate = useNavigate()
  

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
  const auth = useSelector((state: RootState) => state.auth);
  const { isLoggedIn } = auth;



  useEffect(()=>{
    if(isLoggedIn){
      navigate(`/`, { replace: true });
    }
  },[])
  //toggle button function
  const toggleForm = () => {
    if(isSignInState == "signIn"){
        setIsSignInState("signUp")
    }else{
        setIsSignInState("signIn")
    }
  };
  return (
    <>
    <LogoNavbar/>
      <div className="flex h-screen justify-center items-center lg:grid grid-cols-2 w-full mt-10 lg:mt-5">
        {/* auth form */}
        <div className=" w-full flex justify-center items-center">
          <div className="relative max-w-xl w-full h-[35rem] p-8 overflow-hidden ">
            <Signup
              isSignInState={isSignInState}
              toggleForm={toggleForm}
              setIsShowErrorAlert={setIsShowErrorAlert}
              setIsShowSuccessAlert={setIsShowSuccessAlert}
            />
            <Signin
              isSignInState={isSignInState}
              toggleForm={toggleForm}
              setIsShowErrorAlert={setIsShowErrorAlert}
              setIsShowSuccessAlert={setIsShowSuccessAlert}
            />
          </div>
        </div>

        <div className="relative w-full h-full overflow-hidden hidden lg:flex ">
          <img
            style={{
              clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 18% 100%, 0 47%)",
            }}
            src="https://i.pinimg.com/originals/06/6f/fb/066ffbe604a4ea6ceed81d936cdfd03a.jpg"
          />
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
      </div>
    </>
  );
}
