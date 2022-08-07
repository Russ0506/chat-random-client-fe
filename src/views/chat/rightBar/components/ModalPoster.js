import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
import { URL } from "../../../../service/chat.service";
import { axiosClient } from "../../../../setup/axiosClient";

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

export default function ModalPoster({ item, partnerDetail }) {
  console.log(partnerDetail, item);
  const [open, setOpen] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [increaseLike, setIncreaseLike] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "180px",
    minWidth: "120px",
    boxShadow: "none",
    backgroundColor: "gray",
    backgroundImage: `url(${item.image_path})`,
    cursor: "pointer",
  }));

  const reactPost = () => {
    axiosClient
      .post(`${item.id}/toggle_react`)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    setToggle(!toggle);
  };

  React.useEffect(() => {
    if (toggle) {
      setIncreaseLike(1);
    } else setIncreaseLike(0);
  }, [toggle]);

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
          <Stack flexDirection="row" alignItems="center" sx={{ width: "100%" }}>
            <AvatarFrame
              avatarImage={`${URL}/api${partnerDetail.avatar_path}`}
            />
            <Stack
              flexDirection="row"
              alignItems="center"
              className="justify-content-between"
            >
              <Typography sx={{ fontWeight: 550, ml: 1 }}>
                {partnerDetail.name}
              </Typography>
            </Stack>
          </Stack>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ position: "relative", pt: 0, pb: 0 }}>
          <DialogContentText id="alert-dialog-slide-description">
            {item.caption}
          </DialogContentText>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              borderRadius={4}
              sx={{
                margin: "0",
                overflow: "auto",
                height: "100%",
                width: "100%",
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
            <IconButton aria-label="add to favorites" onClick={reactPost}>
              {toggle ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography>
              {item.no_of_reactions + increaseLike > 1
                ? item.no_of_reactions + increaseLike + " likes"
                : item.no_of_reactions + increaseLike + " like"}
            </Typography>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
