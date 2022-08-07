import { Badge, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  StyledFemaleIcon,
  StyledMaleIcon,
} from "../../../common/base/icon/GenderIcon";
import { URL } from "../../../../service/chat.service";

const shapeStyles = {
  bgcolor: "primary.main",
  width: 120,
  height: 120,
  marginTop: 0,
  padding: 0.2,
};
const shapeCircleStyles = { borderRadius: "50%" };

export default function PartnerInfo(props) {
  const circle = (
    <Box
    component="span"
    sx={{
      ...shapeStyles,
      ...shapeCircleStyles,
      backgroundImage: `url(${URL}/api${props.partnerInfor.avatar_path})`,
    }}
  />
  );
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
           {props.partnerInfor.name}{" "}
          </Typography>
          <Typography variant="h4" fontWeight={600} textAlign="center">
            {props.partnerInfor.gender == "male" ? <StyledMaleIcon /> : <StyledFemaleIcon />}
          </Typography>
        </Stack>

        <Box mt={1}>
          <Typography component="div" variant="body1" fontWeight={700}>
            Age:{" "}
            <Typography component="div" variant="body1" display="inline">
              29
            </Typography>
          </Typography>
          <Typography component="div" variant="body1" fontWeight={700}>
            Location:{" "}
            <Typography component="div" variant="body1" display="inline">
              Danang, Viet Nam
            </Typography>
          </Typography>
          <Typography component="div" variant="body1" fontWeight={700}>
            Hobies:{" "}
            <Typography component="div" variant="body1" display="inline">
              Thich cau ca, Thich ca khia
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
