import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function NewPosterLayout() {
  const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "300px",
    boxShadow: "none",
    backgroundColor: "#262525",
    minWidth: "250px",
  }));

  const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
    fontSize: "3rem",
    transition: "0.2s ease-in-out",
    "&:hover": {
      fontSize: "4.2rem",
    },
    // "& .css-1bwcmsk-MuiSvgIcon-root": {
    //   fontSize: "6rem",
    // },
  }));

  return (
    <Item>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <StyledAddIcon style={{ color: "white" }} />
      </Stack>
    </Item>
  );
}
