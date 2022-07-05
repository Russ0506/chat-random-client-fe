import { FormControl } from "@mui/material";
import { styled } from "@mui/styles";

export const CmmnFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: "10px",
  "& .MuiOutlinedInput-root:hover": {
    outline: "none !important",
  },
  "& :hover": {
    outline: "none !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #e5e0e0",
  },
  "& :hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #e5e0e0",
  },
}));
