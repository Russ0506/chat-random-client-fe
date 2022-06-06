import  Login  from "./views/pages/authenticator/Login";
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/pages/authenticator/ResetPassword";
import SignUp from "./views/pages/register/Register";
import Welcome from "./views/pages/welcome/Welcome";
import ChatMainScreen from "./views/pages/chat/MainScreen";
import RegisterConfirm from "./views/pages/register/RegisterConfirm";
import ForgotPassword from "./views/pages/authenticator/ForgotPassword";
import ResetPasswordConfirm from "./views/pages/authenticator/ResetPasswordConfirm";

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Welcome /> },
    {
      path: "/admin",
      element: <HomePage />,
      children: [
      ],
    },
    {
      path: "/users",
      children: [
        { path: "login", element: <Login /> },
        { path: "logout", element: <Welcome /> },
        { path: "reset-password", element: <ResetPassword />, children: [{ path: ":token", element: <ResetPassword /> }]},
        // {
        //   path: "resetPasswordEmailConfirm",
        //   element: <ResetPwdEmailConfirm />,
        // },
        {
          path: "forgotPassword",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/register",
      element: <SignUp />,
      children: [{ path: "", element: "" }],
    },
    {
      path: "/chat-main-screen",
      element: <ChatMainScreen />,
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
  ]);
  return routes;
}
