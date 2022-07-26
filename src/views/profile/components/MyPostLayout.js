import {
  Button,
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
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import myIdol from "../components/img/myidol.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const menuList = [
  {
    name: "Edit",
  },
  {
    name: "Delete",
  },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} unmountOnExit />;
});
function handleClose() {
  return false;
}
export default function PosterLayout({
  open = true,
  image,
  data,
  onClose = handleClose(),
}) {
  const [openM, setOpenM] = useState(open);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleClosePostMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenPostMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseModal = () => {
    onClose();
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
          <Stack
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 550, ml: 1 }}>
              Tuong Vy Bui Anh
            </Typography>
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
                open={Boolean(anchorElNav)}
                onClose={handleClosePostMenu}
              >
                {menuList.map((menu, index) =>
                  menu.name === "New Post" ? (
                    <></>
                  ) : (
                    <MenuItem key={menu.name} onClick={handleClosePostMenu}>
                      <Typography
                        // component={Link}
                        // to={menu.link}
                        textAlign="center"
                        color="#000"
                      >
                        {menu.name}
                      </Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          </Stack>
        </Stack>

        {/* <IconButton size="small" onClick={handleCloseModal}>
          <EditIcon sx={{ width: "22px", height: "22px" }} />
        </IconButton>
        <IconButton size="small">
          <DeleteOutlineIcon sx={{ width: "25px", height: "25px" }} />
        </IconButton> */}
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
            {data.content}
          </Typography>
          <Box
            borderRadius={4}
            sx={{
              margin: "0",
              overflow: "auto",
            }}
          >
            <img width="100%" src={data.image} alt=""></img>
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
          <Typography>{data.likeCount} likes</Typography>
        </Stack>

        {/* <Stack flexDirection="row">
          <IconButton size="small" onClick={handleCloseModal}>
            <EditIcon sx={{ width: "22px", height: "22px" }} />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlineIcon sx={{ width: "25px", height: "25px" }} />
          </IconButton>
        </Stack> */}
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
