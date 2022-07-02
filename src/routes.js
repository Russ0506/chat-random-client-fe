import Login from "./views/auth/Login";
import React, { useEffect } from "react";
import { Navigate, Outlet, Route, useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/auth/ResetPassword";
import SignUp from "./views/auth/Register";
import Welcome from "./views/welcome/Welcome";
import RegisterConfirm from "./views/auth/RegisterConfirm";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPwdEmailSendSuccess from "./views/auth/ResetPwdEmailSendSuccess";
import { PlacesWithStandaloneSearchBox } from "./components/googleMapAPI/GoogleMapAPI";
import ResetPasswordConfirm from "./views/auth/ResetPasswordConfirm";
import RegisterEmailSendSuccess from "./views/auth/RegisterEmailSendSuccess";
import Error404 from "./views/error/Error404";
import Homepage from "./views/Homepage";
import AuthenLoading from "./views/common/base/loading/AuthenLoading";
import UserProfile from "./views/profile/UserProfile";
import CherishSideBar from "./views/common/header/CherishSideBar";

export const ProtectedRoute = ({ link = "/", children }) => {
  return <AuthenLoading link={link} children={children} />;
};

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Welcome /> },
    {
      path: "/admin",
      element: <HomePage />,
      children: [],
    },
    {
      path: "/welcome",
      element: <Welcome />,
      children: [],
    },
    {
      path: "/app",
      element: <ProtectedRoute link="/app" children={<Homepage />} />,
    },
    {
      path: "/users",
      children: [
        {
          path: "login",
          element: <ProtectedRoute link="/users/login" children={<Login />} />,
        },
        { path: "logout", element: <Welcome /> },
        {
          path: "reset-password",
          element: <ResetPassword />,
          children: [{ path: ":token", element: <ResetPassword /> }],
        },
        {
          path: "forgot-password",
          element: (
            <ProtectedRoute
              link="/users/forgot-password"
              children={<ForgotPassword />}
            />
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute link="/users/profile" children={<UserProfile />} />
          ),
        },
      ],
    },
    {
      path: "/reset-password-email-confirm",
      children: [{ path: "success", element: <ResetPwdEmailSendSuccess /> }],
    },
    {
      path: "/test",
      element: <CherishSideBar />,
    },
    {
      path: "/register",
      children: [
        {
          path: "",
          element: <ProtectedRoute link="/register" children={<SignUp />} />,
        },
        {
          path: "email-success",
          element: (
            <ProtectedRoute
              link="/users/email-success"
              children={<RegisterEmailSendSuccess />}
            />
          ),
        },
      ],
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
