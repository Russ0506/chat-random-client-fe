import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function PartnerSecrectInfo() {
  const NamePartner = (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      sx={{ width: "100%", mt: 2 }}
    >
      <Typography
        variant="h4"
        fontWeight={500}
        textAlign="center"
        color="#fff"
        fontSize="2em"
      >
        CherishByChatting
      </Typography>
    </Stack>
  );
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: "20%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {/* <AvatarFrame /> */}
      {NamePartner}
      <Box
        sx={{
          padding: "2% 10%",
          color: "#fff",
          textAlign: "center",
          pt: 3,
          fontFamily: "DancingScript-VariableFont_wght",
          fontSize: "17px",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, accusamus
        qui. Alias facilis perferendis temporibus! Sint dolorem id, minima vero
        consectetur, modi debitis similique mollitia recusandae corrupti nam
        exercitationem culpa?
      </Box>
    </Stack>
  );
}
