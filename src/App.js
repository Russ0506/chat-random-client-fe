import React from "react";
import "./styles/App.css";
// import Register from "./views/pages/register/Register";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Welcome from "./views/pages/welcome/Welcome";
import HomePage from "./views/admin/homePage/HomePage";
import { Login } from "@mui/icons-material";
import ResetPassword from "./views/pages/authenticator/ResetPassword";
import ResetPwdEmailConfirm from "./views/pages/authenticator/ResetPwdEmailConfirm";
import Routes from "./routes";
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
