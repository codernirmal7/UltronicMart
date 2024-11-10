import React, { useEffect } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

// Define prop types for the component
type ErrorAlertProps = {
    isShowErrorAlert : {
        show : boolean,
        message : string | null
    },
    setIsShowErrorAlert : any
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({
    isShowErrorAlert,
    setIsShowErrorAlert
}) => {

    useEffect(()=>{
        if(isShowErrorAlert.show === true){
            setTimeout(()=>{
                setIsShowErrorAlert({
                    show : false,
                    message : ""
                }) 
            },2000)
        }
    },[isShowErrorAlert])
  return (
    <>
      <div
        className={`flex items-center p-4 mb-4 text-sm rounded-lg bg-red-500 dark:bg-gray-800 text-white fixed bottom-0 left-2 z-50 transition-all ${
            isShowErrorAlert.show ? "scale-100" : "scale-0"
        }`}
        role="alert"
      >
        <FaCircleExclamation className="mr-2" />
        <span className="sr-only">Info</span>
        <div>{isShowErrorAlert.message}</div>
      </div>
    </>
  );
};

export default ErrorAlert;
