import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import myIdol from "../components/img/myidol.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function PosterLayout({ open = true, image = myIdol}) {
  const [openM, setOpenM] = useState(open);
  const handleCloseModal = () => {
    setOpenM(false);
  };
  return (
    <Dialog
      open={openM}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-describedby="alert-dialog-slide-description"
      id="des-txtarea-desc"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          className="ct-pt-title"
          flexDirection="row"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <AvatarFrame />
          <Stack justifyContent="center">
            <Typography variant="h6" sx={{ fontWeight: 550, ml: 1 }}>
              Tuong Vy Bui Anh
            </Typography>
          </Stack>
        </Stack>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon sx={{ width: "30px", height: "30px" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ position: "relative" }}>
        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <Typography variant="body1">Tim kiem real love (K)</Typography>
          <Box
            borderRadius={4}
            sx={{
              margin: "0",
              overflow: "auto",
            }}
          >
            <img width="100%" src={image} alt=""></img>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{justifyContent:"flex-start", alignItems:"center"}}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Typography>100 likes</Typography>
      </DialogActions>
    </Dialog>
  );
}
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
    backgroundImage: `url(${myIdol})`,
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
