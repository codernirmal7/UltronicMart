import brandName from "@/constant/BrandName";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import UserInfo from "../User/UserInfoSmallModel";
import { Link } from "react-router-dom";

export default function LogoNavbar() {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  
  const handleClick = () => {
    setIsUserInfoVisible((prev) => !prev);
  };
  return (
    <header className="bg-white fixed top-0 w-full h-[80px] drop-shadow-md shadow-input z-[55]">
      <nav className="max-w-[1500px] w-full h-full flex justify-between items-center mx-auto px-3">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-extrabold text-primary">
            {brandName}
          </Link>
        </div>
        <div onClick={handleClick}>
          <FaRegCircleUser size={32} className="fill-primary cursor-pointer" />
          <UserInfo isVisible={isUserInfoVisible} />
        </div>
      </nav>
    </header>
  );
}
