import { CssBaseline } from "@mui/material";
import React from "react";
import "./styles/App.css";
import ForgotPassword from "./views/pages/forgotPassword/ForgotPassword";
import ChangePassword from "./views/pages/changePassword/ChangePassword";
import { theme } from "./views/theme/fonts/Font";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChangePassword />
      {/* <Home /> */}
      <ForgotPassword />
    </ThemeProvider>
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
