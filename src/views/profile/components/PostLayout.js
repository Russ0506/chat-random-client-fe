import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
  Box,
  Avatar
} from "@mui/material";
import { styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../setup/axiosClient";
import AvatarFrame from "../../common/base/AvatarFrame";
import Loading from "../../common/base/loading/Loading";

const menuList = [
  {
    name: "Edit",
  },
  {
    name: "Delete",
  },
];
const URL = "posts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} unmountOnExit />;
});
function handleClose() {
  return false;
}
export default function PostLayout({
  open = false,
  data,
  onClose = handleClose(),
  isPartnerView,
  onOpenEditBox,
}) {
  const [loading, setLoading] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(false);
  const handleClosePostMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenPostMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseModal = () => {
    onClose();
  };

  const handleCasePost = (index) => {
    if (index === 0) {
      handleCloseModal();
      setTimeout(() => {
        onOpenEditBox();
      }, 500);
    }
    if (index === 1) {
      handleDeletePost();
    }
  };

  const handleDeletePost = () => {
    setLoading(true);
    axiosClient
      .delete(`${URL}/${data?.id}`)
      .then((data) => {
        setTimeout(() => {
          onClose("delete");
        }, 500);
      })
      .catch(() => {
        // setIsPost(false)
      });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-describedby="alert-dialog-slide-description"
      id="des-txtarea-desc"
    >
      <Loading show={loading}></Loading>
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
        <Avatar alt={data?.name} src= {data?.avatar} />
          <Stack
            flexDirection="row"
            alignItems="center"
            width="440px"
            className="justify-content-between"
          >
            <div>
            <Typography sx={{ fontWeight: 550, ml: 1 }}>
              {data?.name}
            {/* {(data.name) ? data.name : localStorage.getItem('user_display_name')} */}
            </Typography>
            <Stack justifyContent="center" flexDirection="row" alignItems="center" sx={{mt: 0.5, ml: 0.5}}>
              {data?.location ? <LocationOnIcon /> : "" }
              <Typography
              variant="subtitle2"
                component="p"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "300px",
                }}
              >
                {data?.location}
              </Typography>
              </Stack>
            </div>
			
            {isPartnerView ? (
              ""
            ) : (
              <Box>
                <IconButton onClick={handleOpenPostMenu}>
                  <MoreHorizIcon sx={{ width: "30px", height: "30px" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  elevation={3}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={anchorElNav}
                  onClose={handleClosePostMenu}
                >
                  {menuList.map((menu, index) =>
                    menu.name === "New Post" ? (
                      <div key={index}></div>
                    ) : (
                      <MenuItem
                        key={index}
                        onClick={() => handleCasePost(index)}
                      >
                        <Typography
                          key={index}
                          textAlign="center"
                          color="#000"
                          fontSize="18px"
                        >
                          {menu.name}
                        </Typography>
                      </MenuItem>
                    )
                  )}
                </Menu>
              </Box>
            )}
          </Stack>
        </Stack>

        <IconButton size="small" onClick={handleCloseModal}>
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
            {data?.content}
          </Typography>
          <Box
            borderRadius={4}
            sx={{
              margin: "0",
              overflow: "auto",
            }}
          >
            <img width="100%" src={data?.image} alt=""></img>
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
          <Typography>{data?.likeCount} likes</Typography>
        </Stack>

      </DialogActions>
    </Dialog>
  );
}
