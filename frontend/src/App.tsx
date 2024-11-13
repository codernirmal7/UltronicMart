import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux";
import { getUserData, isLoggedIn } from "./redux/slices/authSlice";
import { useEffect } from "react";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import "swiper/css";
import "swiper/css/pagination";
import Laptops from "./pages/Laptops";



const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <>
        <Auth />
      </>
    ),
  },

  {
    path: "/auth/verify",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/auth/forget-password",
    element: (
      <>
        <ForgetPassword />
      </>
    ),
  },

  {
    path: "/auth/reset-password/:token",
    element: (
      <>
        <ResetPassword />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/laptops",
    element: (
      <>
        <Laptops />
      </>
    ),
  },
 
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserData('user-data'));
    dispatch(isLoggedIn());
  }, [dispatch]);
  
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
