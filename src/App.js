import React, { useEffect } from "react"
import "./styles/App.css"
import "./styles/loading.css"
import { BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GRP_COLOR} from "./constant/css_constant"
import { user_verify } from "./features/auth";
import { useDispatch } from "react-redux";
import SignIn from "./views/pages/auth/Login";

function App() {

  const themeDefault = createTheme({
    palette: {
      text: {
        primary: GRP_COLOR.CODE016,
        second: GRP_COLOR.CODE016,
      },
      background: {
        default: "#f1f1f1",
      },
      primary: {
        main: GRP_COLOR.CODE016,
      },
      // mode: GRP_COLOR.CODE016,
    },
  });

  
  return (
    <ThemeProvider theme={themeDefault}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
