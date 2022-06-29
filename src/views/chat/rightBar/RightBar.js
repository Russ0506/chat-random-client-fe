import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PartnerInfo from "./components/PartnerInfo";
import PartnerPoster from "./components/PartnerPoster";

export default function RightBar() {
  return (
    <>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "35%" }}
      >
        <PartnerInfo />
      </Stack>
      <Box sx={{ height: "40%" }}>
        <PartnerPoster />
      </Box>
    </>
  );
}
