import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux";
import { getUserData, isLoggedIn } from "./redux/slices/authSlice";
import { useEffect } from "react";

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
