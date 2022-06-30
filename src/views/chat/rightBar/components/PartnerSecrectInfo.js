import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import vybat from "../img/vyBatBG.jpg";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const shapeStyles = {
  bgcolor: "primary.main",
  width: 130,
  height: 130,
  padding: 4,
  backgroundColor: "#fff",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
const shapeCircleStyles = { borderRadius: "50%" };
const StyledMaleIcon = styled(MaleIcon)(({ theme }) => ({
  fontSize: "3rem",
  transition: "0.2s ease-in-out",
  color: "#1793c3",
}));

const StyledFemaleIcon = styled(FemaleIcon)(({ theme }) => ({
  fontSize: "3rem",
  transition: "0.2s ease-in-out",
  color: "#e37dcf",
}));

export default function PartnerSecrectInfo() {
  const [gender, setGender] = React.useState("female");
  const AvatarFrame = styled(Box)(({ theme }) => ({
    ...shapeCircleStyles,
    ...shapeStyles,
    "&::before": {
      borderRadius: "50%",
      zIndex: "-1",
      content: '""',
      display: "block",
      height: "100%",
      width: "100%",
      backgroundImage: `url(${vybat})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
  }));

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
        Tuong Vy{" "}
      </Typography>
      <Typography variant="h4" fontWeight={600} textAlign="center">
        {gender == "male" ? <StyledMaleIcon /> : <StyledFemaleIcon />}
      </Typography>
    </Stack>
  );
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: "12%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <AvatarFrame />
      {NamePartner}
      <Box sx={{ padding: "2% 10%", color: "#fff", textAlign: "center" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, accusamus
        qui. Alias facilis perferendis temporibus! Sint dolorem id, minima vero
        consectetur, modi debitis similique mollitia recusandae corrupti nam
        exercitationem culpa?
      </Box>
    </Stack>
  );
}
