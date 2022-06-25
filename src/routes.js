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
import { user_verify } from "./features/auth";
import { useDispatch } from "react-redux";
import Loading from "./views/common/base/loading/Loading";

export const ProtectedRoute = ({ redirectPath = "/users/login", children }) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState();

  useEffect(() => {
    dispatch(user_verify())
      .unwrap()
      .then((res) => {
        setData({
          role: res.role,
          logged_in: res.logged_in,
        });
      })
      .catch(() => {
        setData({
          role: "",
          logged_in: false,
        });
      });
  }, []);

  return (
    <>
      {data && !data.logged_in ? (
        <>
          <Navigate to={redirectPath} replace />
        </>
      ) : (
        <>
          <Loading show={false}></Loading>
          {children}
        </>
      )}
    </>
  );
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
      path: "/users",
      children: [
        {
          path: "user-homepage",
          element: <ProtectedRoute children={<Homepage />} />,
        },
        { path: "login", element: <Login /> },
        { path: "logout", element: <Welcome /> },
        {
          path: "reset-password",
          element: <ResetPassword />,
          children: [{ path: ":token", element: <ResetPassword /> }],
        },
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

      children: [{ path: "success", element: <ResetPwdEmailSendSuccess /> }],
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
      element: <PlacesWithStandaloneSearchBox />,
    },
    {
      path: "/app",
      element: <ProtectedRoute children={<Homepage />} />,
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
