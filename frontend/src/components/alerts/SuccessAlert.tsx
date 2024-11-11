import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";

// Define prop types for the component
type SuccessAlertProps = {
  isShowSuccessAlert : {
      show : boolean,
      message : string | null
  },
  setIsShowSuccessAlert : any
};

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  isShowSuccessAlert,
  setIsShowSuccessAlert
}) => {
  useEffect(()=>{
    if(isShowSuccessAlert.show === true){
        setTimeout(()=>{
          setIsShowSuccessAlert({
                show : false,
                message : ""
            }) 
        },2000)
    }
},[isShowSuccessAlert])
  return (
    <>
      <div
        className={`flex items-center p-4 mb-4 text-sm rounded-lg bg-green-500 text-white z-50 fixed bottom-0 left-2 transition-all ${
          isShowSuccessAlert.show ? "scale-100" : "scale-0"
        }`}
        role="alert"
      >
        <FaCircleCheck className="mr-2" />
        <div>{isShowSuccessAlert.message}</div>
      </div>
    </>
  );
};

export default SuccessAlert