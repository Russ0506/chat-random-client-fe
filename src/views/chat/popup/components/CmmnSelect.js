import { Select } from "@mui/material";
import { styled } from "@mui/styles";

export const CmmnSelect = styled(Select)(({ theme }) => ({
  outline: "none",
  borderRadius: 5,
  position: "relative",
  // backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
  backgroundColor: "transparent",
  border: "1px solid #e5e0e0",
  fontSize: 16,
  padding: "10px 12px",
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
  ]),
  // Use the system font instead of the default Roboto font.
  fontFamily: [
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
  "&:before": {
    border: "none",
  },
  "&:hover:not(.Mui-disabled):before": {
    border: "none",
  },
  "&:hover": {
    outline: "none",
  },
  "&:focus": {
    // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
}));
