import  Login  from "./views/pages/authenticator/Login";
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/pages/authenticator/ResetPassword";
import SignUp from "./views/pages/register/Register";
import ResetPwdEmailConfirm from "./views/pages/authenticator/ResetPwdEmailConfirm";
import Welcome from "./views/pages/welcome/Welcome";
import { ChatMainScreen } from "./views/pages/chat/MainScreen";

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Welcome /> },
    {
      path: "/admin",
      element: <HomePage />,
      children: [
        // { path: ":id", element: <Invoice /> },
        // { path: "/pending", element: <Pending /> },
        // { path: "/complete", element: <Complete /> },
      ],
    },
    {
      path: "/users",
      element: <Login />,
      children: [
        {path: "resetPassword", element: <ResetPassword />},
        {path: "resetPasswordEmailConfirm", element: <ResetPwdEmailConfirm />},
        { path: "login", element: <Login /> },
        { path: "logout", element: <Login /> },
      ], 
    },
    {
      path: "/register",
      element: <SignUp />,
      children: [
        {path: "", element: ""},
      ],
    },
    {
      path: "/chat-main-screen",
      element: <ChatMainScreen />,
      children: [
        {path: "", element: ""},
      ],
    },
  ]);
  return routes;
}
