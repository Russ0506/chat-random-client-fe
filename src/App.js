import React from "react";
import "./styles/App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GRP_COLOR, FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT, BORDER_RADIUS, BOX_SHADOW } from "./constant/css_constant"

function App() {

  const themeDefault = createTheme({
    palette: {
      text: {
        primary: GRP_COLOR.CODE016
      },
      background: {
        default: GRP_COLOR.CODE017
      },
      primary: {
        main: GRP_COLOR.CODE016,
      },
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
