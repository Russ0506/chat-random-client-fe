import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PartnerInfo from "./components/PartnerInfo";
import PartnerPoster from "./components/PartnerPoster";
import SecrectPartnerPoster from "./components/SecrectPartnerPoster";

export default function RightBar() {
  const [showInfo, setShowInfo] = React.useState(false);
  function shareInformation(){
    setShowInfo(true);
  }
  return showInfo === false ? (
    <SecrectPartnerPoster showInfo={shareInformation}/>
  ) : (
    <>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "30%", minHeight: "320px" }}
      >
        <PartnerInfo />
      </Stack>
      <Box sx={{ height: "40%" }}>
        <PartnerPoster />
      </Box>
    </>
  );
}
