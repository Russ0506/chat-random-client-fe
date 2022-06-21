import Login from "./views/pages/authenticator/Login";
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/pages/authenticator/ResetPassword";
import SignUp from "./views/pages/register/Register";
import Welcome from "./views/pages/welcome/Welcome";
import RegisterConfirm from "./views/pages/register/RegisterConfirm";
import ForgotPassword from "./views/pages/authenticator/ForgotPassword";
import ResetPwdEmailSendSuccess from "./views/pages/authenticator/ResetPwdEmailSendSuccess";
import { PlacesWithStandaloneSearchBox } from "./components/googleMapAPI/GoogleMapAPI";
import ResetPasswordConfirm from "./views/pages/authenticator/ResetPasswordConfirm";
import RegisterEmailSendSuccess from "./views/pages/register/RegisterEmailSendSuccess";
import Homepage from "./views/user/Homepage";

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
        {path: "homepage", element: <Homepage />},
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
      path: "/reset-password",
      element: <ResetPassword />,
      children: [{ path: "", element: "" }],
    },
    {
      path: "/reset-password-email-confirm",

      children: [
        // { path: "", element: <ResetPwdEmailConfirm /> },
        { path: "success", element: <ResetPwdEmailSendSuccess /> },
      ],
    },
    {
      path: "/register",

      children: [
        // { path: "", element: <ResetPwdEmailConfirm /> },
        { path: "", element: <SignUp/> },
        { path: "email-success", element: <RegisterEmailSendSuccess/> },
      ],
    },
    // {
    //   path: "/users",
    //   children: [
    //     { path: "resetPassword", element: <ResetPassword /> },
    //     {
    //       path: "resetPasswordEmailConfirm",
    //       element: <ResetPwdEmailConfirm />,
    //     },
    //     { path: "login", element: <Login /> },
    //     { path: "logout", element: <Welcome /> },
    //   ],
    // },
    {
      path: "/ggmap-api-testing",
      element: <PlacesWithStandaloneSearchBox />
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
