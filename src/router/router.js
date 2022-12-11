import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/Error/ErrorPage";
import Presentation from "../pages/Presentation/Presentation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/my-presentation",
    element: <Presentation />,
    errorElement: <ErrorPage />,
  },
]);

const RootRouter = (props) => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
