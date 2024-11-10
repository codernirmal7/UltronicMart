import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail";
import Signin from "./pages/Signin";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <>
        <Signin />
      </>
    ),
  },
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
