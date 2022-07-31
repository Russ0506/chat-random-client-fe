import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Paper,
  Modal,
  Box,
  Button,
} from "@mui/material";
import AvatarFrame from "../../../common/base/AvatarFrame";
import { styled } from "@mui/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "60vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ModalPoster({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "180px",
    minWidth: "120px",
    boxShadow: "none",
    backgroundColor: "gray",
    backgroundImage: `url(${item.image_path})`,
    cursor: "pointer",
  }));
  return (
    <div>
      <Item as={IconButton} onClick={handleOpen}></Item>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"

      >
        <Box sx={style} padding={5}>
          <div style={{ position: "relative" }}>
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
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  width="440px"
                  className="justify-content-between"
                >
                  <Typography sx={{ fontWeight: 550, ml: 1 }}>
                    {localStorage.getItem('user_display_name')}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton size="small">
                <CloseIcon sx={{ width: "30px", height: "30px" }} onClick={handleClose} />
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
                <Typography variant="body1" marginBottom={1.5}>
                  {item.content}
                </Typography>
                <Box
                  borderRadius={4}
                  sx={{
                    margin: "0",
                    overflow: "auto",
                  }}
                >
                  <img src={`${item.image_path}`} alt="" width="50%" loading="lazy"></img>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                pl: 2,
                pr: 2,
                pt: 0,
              }}
            >
              <Stack flexDirection="row" alignItems="center">
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Typography>{item.likeCount} likes</Typography>
              </Stack>
            </DialogActions>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
