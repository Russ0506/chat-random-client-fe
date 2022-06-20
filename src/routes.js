import Login from "./views/pages/auth/Login";
import React, { useEffect } from "react";
import { Navigate, Outlet, Route, useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/pages/auth/ResetPassword";
import SignUp from "./views/pages/auth/Register";
import Welcome from "./views/pages/welcome/Welcome";
import ChatMainScreen from "./views/pages/chat/MainScreen";
import RegisterConfirm from "./views/pages/auth/RegisterConfirm";
import ForgotPassword from "./views/pages/auth/ForgotPassword";
import ResetPwdEmailSendSuccess from "./views/pages/auth/ResetPwdEmailSendSuccess";
import { PlacesWithStandaloneSearchBox } from "./components/googleMapAPI/GoogleMapAPI";
import ResetPasswordConfirm from "./views/pages/auth/ResetPasswordConfirm";
import RegisterEmailSendSuccess from "./views/pages/auth/RegisterEmailSendSuccess";
import { useCookies } from "react-cookie";
import Error404 from "./views/pages/error/Error404";
import UserHomepage from "./views/user/UserHomepage";
import { user_verify } from "./features/auth";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/users/login',
  children,
}) => {

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default function Routes() {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({ role: '', logged_in: false })

  useEffect(() => {
    dispatch(user_verify()).unwrap()
      .then((res) => {
        setData({
          role: res.role,
          logged_in: res.logged_in,
        })
      })
      .catch(() => {
      });
  }, []);

  const routes = useRoutes([
    { path: "/", element: <Welcome /> },
    {
      path: "/admin",
      element: <HomePage />,
      children: [
      ],
    },
    {
      path: "/welcome",
      element: <Welcome />,
      children: [
      ],
    },
    {
      path: "/users",
      children: [
        {
          path: "user-homepage", element: <ProtectedRoute
            isAllowed={data.logged_in}
            children={<UserHomepage />}
          />
        },
        { path: "login", element: <Login /> },
        { path: "logout", element: <Welcome /> },
        { path: "reset-password", element: <ResetPassword />, children: [{ path: ":token", element: <ResetPassword /> }] },
        {
          path: "forgotPassword",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
      children: [{ path: "", element: "" }],
    },
    {
      path: "/reset-password-email-confirm",

      children: [
        { path: "success", element: <ResetPwdEmailSendSuccess /> },
      ],
    },
    {
      path: "/register",

      children: [
        { path: "", element: <SignUp /> },
        { path: "email-success", element: <RegisterEmailSendSuccess /> },
      ],
    },
    {
      path: "/ggmap-api-testing",
      element: <PlacesWithStandaloneSearchBox />
    },
    {
      path: "/chat-main-screen",
      element:
        <ProtectedRoute
          isAllowed={data.logged_in}
          children={<ChatMainScreen />}
        />,
      children: [{ path: "", element: "" }],
    },
    {
      path: "/confirm-email-register",
      element: <RegisterConfirm />,
      children: [{ path: ":token", element: <RegisterConfirm /> }],
    },
    {
      path: "/confirm-email-reset-password",
      element: <ResetPasswordConfirm />,
      children: [{ path: ":token", element: <ResetPasswordConfirm /> }],
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);
  return routes;
}
