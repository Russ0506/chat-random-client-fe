import { Login } from "@mui/icons-material";
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/pages/authenticator/ResetPassword";
import ResetPwdEmailConfirm from "./views/pages/authenticator/ResetPwdEmailConfirm";
import Welcome from "./views/pages/welcome/Welcome";

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
  ]);
  return routes;
}
