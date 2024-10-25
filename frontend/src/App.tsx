import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/pages/auth/auth";
import LoginValidation from "./components/pages/auth/loginValidation";
import { Toaster } from "@/components/ui/toaster";
import ProfileSelection from "./components/pages/profileSelection/profileSelection";
import ProtectedAuthParent from "./components/pages/protectedAuthParent/protectedAuthParent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/authentication",
      element: <Auth />,
    },
    {
      path: "/loginValidation",
      element: <LoginValidation />,
    },
    {
      path: "/profile-selection",
      element: (
        <ProtectedAuthParent>
          <ProfileSelection />
        </ProtectedAuthParent>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
