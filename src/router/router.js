import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/Error/ErrorPage";
import Participant from "../pages/Participant/Participant";
import Presentation from "../pages/Presentation/Presentation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Signup/Register";
import ActivationEmail from "../pages/auth/ActivationEmail/ActivationEmail";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/user/activate/:activation_token",
    element: <ActivationEmail />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/my-presentation/:idPresentation",
    element: <Presentation />,
  },
  {
    path: "/participant",
    element: <Participant />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const RootRouter = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default RootRouter;
