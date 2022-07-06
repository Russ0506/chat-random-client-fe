import { Select } from "@mui/material";
import { styled } from "@mui/styles";

export const CmmnGroupSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #e5e0e0",
  },
  "&:hover": {
    outline: "none",
  },
}));
