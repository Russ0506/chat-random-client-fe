import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import AvatarFrame from "../../../common/base/AvatarFrame";
import { styled } from "@mui/styles";

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
    <>
      <Item as={IconButton} onClick={handleOpen}></Item>
      {/* <PostLayout
              open={open}
              onClose={handleClose}
              data={item}
              isReadonlyMode={true}
            /> */}
      <Dialog
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <AvatarFrame />
            <Stack
              flexDirection="row"
              alignItems="center"
              className="justify-content-between"
            >
              <Typography sx={{ fontWeight: 550, ml: 1 }}>
                {localStorage.getItem("user_display_name")}
              </Typography>
            </Stack>
          </Stack>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ position: "relative", pt: 0, pb:0 }}>
          <DialogContentText id="alert-dialog-slide-description">
            {item.content}
          </DialogContentText>
          <Box
            sx={{
              width: "100%",
              height:"100%",
              position: "relative",
            }}
          >
            <Box
              borderRadius={4}
              sx={{
                margin: "0",
                overflow: "auto",
                height:"100%",
                width:"100%"
              }}
            >
              <img
                src={`${item.image_path}`}
                alt=""
                height="100%"
                width="100%"
                loading="lazy"
              ></img>
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
      </Dialog>
    </>
  );
}
