import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail";

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
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
