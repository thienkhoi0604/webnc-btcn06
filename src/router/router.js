import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import ErrorPage from "../pages/Error/ErrorPage";
import Participant from "../pages/Participant/Participant";
import Presentation from "../pages/Presentation/Presentation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Signup/Register";
import ActivationEmail from "../pages/auth/ActivationEmail/ActivationEmail";
import Group from "../pages/Group/Group";
import DetailGroup from "../pages/DetailGroup/DetailGroup";
import AccepInvitation from "../pages/auth/AcceptInvitation/AcceptInvitation";
import { OptionsProvider } from "../context/option";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

const RootRouter = (props) => {
  const auth = useSelector((state) => state.auth);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={auth.isLogged ? <Dashboard /> : <Login />}
            exact
          />
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route
            path="/user/activate/:activation_token"
            element={<ActivationEmail />}
          />
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/groups" element={<Group />} exact />
          <Route path="/groups/:idGroup" element={<DetailGroup />} />
          <Route
            path="/group/invitation/:activation_token"
            element={<AccepInvitation />}
          />
          <Route
            path="/my-presentation/:idPresentation"
            element={
              <OptionsProvider>
                <Presentation />
              </OptionsProvider>
            }
          />
          <Route path="/participant" element={<Participant />} exact />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default RootRouter;
