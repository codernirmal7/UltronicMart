import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

// Define prop types for the component
type SuccessAlertProps = {
  message: string;
  isOpenSuccessAlert: boolean;
};

const SuccessAlert: React.FC<SuccessAlertProps> = ({
  message,
  isOpenSuccessAlert,
}) => {
  return (
    <>
      <div
        className={`flex items-center p-4 mb-4 text-base rounded-lg bg-gray-800 text-green-400 z-50 fixed bottom-0 left-2 transition-all ${
          isOpenSuccessAlert ? "scale-100" : "scale-0"
        }`}
        role="alert"
      >
        <FaCircleCheck className="mr-2" />
        <div>{message}</div>
      </div>
    </>
  );
};

export default SuccessAlert