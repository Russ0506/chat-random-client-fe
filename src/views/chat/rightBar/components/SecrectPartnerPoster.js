import styled from "@emotion/styled";
import { Box } from "@mui/system";
import vyBatBG from "../img/vyBatBG.jpg";
import nhuBg from "../img/nhuAva.jpg";
import anBg from "../img/anAva.jpg";
import allin from "../img/allin.png";
import wwwws from "../img/sss.png";
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
  backgroundImage: `url(${wwwws})`,
  "&::before": {
    content: '""',
    display: "block",
    backgroundColor: "rgb(123,117,194,0.7)",
    // backgroundColor: "rgb(46,43,49,0.7)",
    background:
      "linear-gradient(180deg, #b8abffbf, #817ccebf 55%, #8473dae6 100%)",
    height: "100%",
    width: "100%",
  },
}));

const SharedInfoButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  transform: "translate(-50%, 0)",
  left: "50%",
  backgroundColor: "#fff",
  padding: "10px 20px",
  borderRadius: "20px",
  fontSize: "14px",
  color: "#000",
  boxShadow: "0px 8px 15px rgb(200 200 200 / 40%)",
  transition: "all 0.3s ease 0s",
  "&:hover": {
    backgroundColor: "#2EE59D",
    boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
    color: "#fff",
    transform: "translate(-50%, -7px)",
  },
}));

export default function SecrectPartnerPoster(props) {
  return (
    <>
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <MansoryImageBG />
        <PartnerSecrectInfo />
        <SharedInfoButton variant="contained" onClick={props.showInfo}>
          Share Profile
        </SharedInfoButton>
      </Box>
    </>
  );
}
