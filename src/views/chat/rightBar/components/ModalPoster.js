import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
import PostLayout from "../../../profile/components/MyPostLayout";
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
    axiosClient.post(`${item.id}/toggle_react`).then((data) => console.log(data))
      .catch(err => console.error(err))
    setToggle(!toggle)
  }

  React.useEffect(() => {
    if (toggle) {
      setIncreaseLike(1)
    } else setIncreaseLike(0)
  }, [toggle])
  
  return (
    <div>
      <Item as={IconButton} onClick={handleOpen}></Item>
      {/* <PostLayout
              open={open}
              onClose={handleClose}
              data={item}
              isReadonlyMode={true}
            /> */}
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
                <AvatarFrame avatarImage={`${URL}/api${partnerDetail.avatar_path}`} />
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  width="440px"
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
            <DialogContent sx={{ position: "relative" }}>
              <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <Typography variant="body1" marginBottom={1.5}>
                  {item.caption}
                </Typography>
                <Box
                  borderRadius={4}
                  sx={{
                    maxHeight: "300px",
                    margin: "0",
                    overflowY: "scroll",
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
                <IconButton aria-label="add to favorites" onClick={reactPost} >
                  {toggle ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography>{item.no_of_reactions + increaseLike > 1 ? (item.no_of_reactions + increaseLike + " likes") : (item.no_of_reactions + increaseLike + " like")}</Typography>
              </Stack>
            </DialogActions>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
