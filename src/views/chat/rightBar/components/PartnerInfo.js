import {
  Badge,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import StarBorder from "@mui/icons-material/StarBorder";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import styled from "@emotion/styled";

const shapeStyles = {
  bgcolor: "primary.main",
  width: 120,
  height: 120,
  marginTop: 0,
  padding: .2
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

const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);
export default function PartnerInfo() {
  const [gender, setGender] = React.useState("male");
  return (
    <Stack flexDirection="column" justifyContent="center" alignItems="center">
      <Badge>{circle}</Badge>
      <Box width="100%" mt={2}>
        <Stack
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          sx={{ width: "100%" }}
        >
          <Typography variant="h4" fontWeight={600} textAlign="center">
            Nhat Quy{" "}
          </Typography>
          <Typography variant="h4" fontWeight={600} textAlign="center">
            {gender == "male" ? (
              <StyledMaleIcon />
            ) : (
              <StyledFemaleIcon/>
            )}
          </Typography>
        </Stack>

        <Box mt={1}>
          <Typography variant="body1" fontWeight={700}>
            Age:{" "}
            <Typography variant="body1" display="inline">
              29
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            Location:{" "}
            <Typography variant="body1" display="inline">
              Danang, Viet Nam
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            Hobies:{" "}
            <Typography variant="body1" display="inline">
              Thich cau ca, Thich ca khia
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
