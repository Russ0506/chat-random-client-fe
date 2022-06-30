import styled from "@emotion/styled";
import { Box } from "@mui/system";
import vyBatBG from "../img/vyBatBG.jpg";
import nhuBg from "../img/nhuAva.jpg";
import anBg from "../img/anAva.jpg";
import allin from "../img/allin.png";
import React from "react";
import { Button, Stack } from "@mui/material";
import PartnerSecrectInfo from "./PartnerSecrectInfo";

const MansoryImageBG = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  backgroundImage: `url(${vyBatBG})`,
  "&::before": {
    content: '""',
    display: "block",
    // backgroundColor: "rgb(123,117,194,0.7)",
    backgroundColor: "rgb(46,43,49,0.7)",
    height: "100%",
    width: "100%",
  },
}));

const SharedInfoButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: 70,
  transform: "translate(-50%, 0)",
  left: "50%",
  backgroundColor: "#fff",
  padding: "12px 35px",
  borderRadius: "20px",
  color: "#000",
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease 0s",
  "&:hover": {
    backgroundColor: "#2EE59D",
    boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
    color: "#fff",
    transform: "translate(-50%, -7px)",
  },
}));

export default function SecrectPartnerPoster() {
  return (
    <>
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <MansoryImageBG />
        <PartnerSecrectInfo />
        <SharedInfoButton variant="contained">
          Share Infomation
        </SharedInfoButton>
      </Box>
    </>
  );
}
