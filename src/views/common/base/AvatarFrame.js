import { Box } from "@mui/material";
import { styled } from "@mui/styles";

const AvatarFrame = styled(Box)(({ theme, avatarImage }) => ({
    ...shapeCircleStyles,
    ...shapeStyles,
    "&::before": {
      borderRadius: "50%",
      zIndex: "-1",
      content: '""',
      display: "block",
      height: "100%",
      width: "100%",
      backgroundImage: avatarImage ? `url(${avatarImage})` : `url(${localStorage.getItem('avatar_path')})`,
      backgroundColor: "#817cce",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
  }));
  
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
  const shapeCircleStyles = { borderRadius: "50%" };

  export default AvatarFrame;