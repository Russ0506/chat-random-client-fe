import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import defaultImg from "../components/img/myidol.jpg";
export default function PostCard({ like = 0, image= defaultImg }) {
  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Stack
        flexDirection="row"
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
        position="relative"
      >
        <img src={`${image}`} alt="" style={{position: "absolute", top: 0, left: 0, width: "100%"}}></img>
        <Stack flexDirection="row" alignItems="center">
          <FavoriteBorderIcon />
          <Typography marginLeft="3px">{like}</Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
