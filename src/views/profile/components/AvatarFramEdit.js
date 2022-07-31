import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
// import avatarDemo from "../components/img/myidol.jpg";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton } from "@mui/material";

const shapeCircleStyles = { borderRadius: "50%" };
const shapeStyles = {
  bgcolor: "primary.main",
  width: 60,
  height: 60,
  padding: 4,
  backgroundColor: "#fff",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function AvatarFramEdit(props) {
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
      backgroundImage: `url(${(props.img == null || props.img =='' )? localStorage.getItem('avatar_path') : props.img})`,
      backgroundColor: "#817cce",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
  }));
  return (
    <AvatarFrame sx={props.sx}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        disableRipple
        sx={{
          position: "absolute",
          right: "0",
          bottom: "0",
          borderRadius: "50%",
          background: "rgb(236, 236, 250)",
          border: "2px solid white",
          fontSize: "10px",
          width: "35px",
          height: "35px",
        }}
      >
        <PhotoCamera />
      </IconButton>
    </AvatarFrame>
  );
}
