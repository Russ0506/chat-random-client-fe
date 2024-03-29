import Login from "./views/auth/Login";
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./views/admin/homePage/HomePage";
import ResetPassword from "./views/auth/ResetPassword";
import SignUp from "./views/auth/Register";
import RegisterConfirm from "./views/auth/RegisterConfirm";
import ForgotPassword from "./views/auth/ForgotPassword";
import ResetPwdEmailSendSuccess from "./views/auth/ResetPwdEmailSendSuccess";
import ResetPasswordConfirm from "./views/auth/ResetPasswordConfirm";
import RegisterEmailSendSuccess from "./views/auth/RegisterEmailSendSuccess";
import Error404 from "./views/error/Error404";
import Homepage from "./views/Homepage";
import AuthenLoading from "./views/common/base/loading/AuthenLoading";
import CherishApp from "./views/common/header/CherishApp";
import MenuPreProfile from "./views/profile/components/MenuPreProfile";
import NewsFeed from "./views/newsFeed/NewsFeed";
import Logout from "./views/auth/Logout";
import DashDefault from "./views/admin/dashboard/DashDefault/DashDefault";
import AdminLayout from "./components/layouts/AdminLayout/AdminLayout";
import UserManagement from "./views/admin/tables/UserManagement";
import UserProfilePage from "./views/profile/UserProfilePage";
import WelcomePage from "./views/welcome/WelcomePage";
import AdminLogin from "./views/auth/AdminLogin";

export const ProtectedRoute = ({ link = "/", children }) => {
  return <AuthenLoading link={link} children={children} />;
};

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <WelcomePage /> },
    {
      path: "/template",
      children: [
        {
          path: "",
          element: (
            <AdminLayout>
              <DashDefault />
            </AdminLayout>
          ),
        },
        {
          path: "dashboard",
          element: (
            <AdminLayout>
              <DashDefault />
            </AdminLayout>
          ),
        },
        {
          path: "tables",
          element: (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ),
        },
      ],
    },
    {
      path: "/admin",
      children: [
        {
          path: "login",
          element: <AdminLogin />,
        },
        {
          path: "",
          element: (
            <AdminLayout>
              <DashDefault />
            </AdminLayout>
          ),
        },
        {
          path: "dashboard",
          element: (
            <AdminLayout>
              <DashDefault />
            </AdminLayout>
          ),
        },
        {
          path: "user-management",
          element: (
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          ),
        },
      ],
    },
    {
      path: "/welcome",
      element: <WelcomePage />,
      children: [],
    },
    {
      path: "/app",
      element: (
        <CherishApp
          body={<ProtectedRoute link="/app" children={<Homepage />} />}
          index={2}
        />
      ),
    },
    {
      path: "/homepage",
      element: (
        <CherishApp
          body={<ProtectedRoute link="/homepage" children={<NewsFeed />} />}
          index={1}
        />
      ),
    },
    {
      path: "/users",
      children: [
        {
          path: "login",
          element: <ProtectedRoute link="/users/login" children={<Login />} />,
        },
        { path: "logout", element: <Logout /> },
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
          children: [
            {
              path: "edit",
              element: (
                <CherishApp
                  body={
                    <ProtectedRoute
                      link="/users/profile/edit"
                      children={<MenuPreProfile />}
                    />
                  }
                  index={-1}
                />
              ),
            },
            {
              path: ":userId",
              element: (
                <CherishApp
                  body={
                    <ProtectedRoute
                      link="/users/profile"
                      children={<UserProfilePage />}
                    />
                  }
                  index={-1}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/reset-password-email-confirm",
      children: [{ path: "success", element: <ResetPwdEmailSendSuccess /> }],
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
          element: <RegisterEmailSendSuccess />,
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
