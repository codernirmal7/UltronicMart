import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";

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
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
