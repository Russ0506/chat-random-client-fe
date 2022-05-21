import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Public-Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
