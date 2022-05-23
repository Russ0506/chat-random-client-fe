import { CssBaseline } from "@mui/material";
import React from "react";
import "./styles/App.css";
import ResetPassword from "./views/pages/authenticator/ResetPassword";
import { theme } from "./views/theme/fonts/Font";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./views/pages/authenticator/Login";
import ResetPwdEmailConfirm from "./views/pages/authenticator/ResetPwdEmailConfirm";

function App() {
  return (
    // <Login />
    // <ResetPwdEmailConfirm /> //done
    <ResetPassword />
    // <ThemeProvider theme={theme}>

    // </ThemeProvider>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
}

export default App;
