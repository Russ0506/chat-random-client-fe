import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import myIdol from "../components/img/myidol.jpg";
import { styled } from "@mui/styles";
import {
  IconButton,
  Input,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import Iconify from "../../common/base/icon/Iconify";
// import EmojiPicker from "../../common/base/emoji/EmojiPicker"; // ko xoa nha
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { CmmnFormControl } from "../../chat/popup/components/CmmnFormControl";
import GgmApiForPost from "./GgmApiForPost";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import InputEmoji from "react-input-emoji"; // ko xoa nha
// import Picker from "emoji-picker-react"; // ko xoa nha
// import EmojiTextarea from "react-emoji-textarea"; // ko xoa nha

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} in={true} />;
});
function defaultHandle() {
  return false;
}

export default function NewPosterLayout({
  open = true,
  onClose = defaultHandle(),
}) {
  const [openModal, setOpenModal] = useState(open);
  const fileInputRef = React.useRef(null);
  const [message, setMessage] = useState("");
  const [openLocationBox, setOpenLocationBox] = useState(false);
  const [location, setLocation] = useState({
    addr: "",
    lo: "",
    lat: "",
  });
  const [usingLocation, setUsingLocation] = useState(false);
  const handleAttach = () => {
    fileInputRef.current?.click();
  };
  const handleCloseModal = () => {
    onClose();
    setOpenModal(false);
  };
  const handleCloseSubmit = () => {
    onClose();
    setOpenModal(false);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return "";
    }
  };

  function handleOpenLocationBox() {
    if (usingLocation === true) {
      setUsingLocation(false);
      setLocation({ addr: "", lo: "", la: "" });
    } else {
      setOpenLocationBox(true);
    }
  }

  function backLocationToPost(isUsed) {
    setUsingLocation(isUsed === true ? true : false);
    setOpenLocationBox(false);
  }
  function backLocationToPostTitle() {
    setOpenLocationBox(false);
  }

  return (
    <>
      <Dialog
        open={openModal}
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
          {openLocationBox === true ? (
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              size="medium"
              onClick={backLocationToPostTitle}
            >
              <Typography variant="body1">Search Your Location</Typography>
            </Button>
          ) : (
            <Typography variant="h6">New Post</Typography>
          )}
          <IconButton onClick={handleCloseModal}>
            <CloseIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </DialogTitle>
        {openLocationBox === true ? (
          <DialogContent sx={{ position: "relative", minHeight: "420px" }}>
            <LocationFormControl variant="standard">
              <GgmApiForPost
                reponseLocation={setLocation}
                onBack={backLocationToPost}
              />
            </LocationFormControl>
          </DialogContent>
        ) : (
          <>
            <DialogContent sx={{ position: "relative" }}>
              <DialogContentText id="alert-dialog-slide-description">
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

                    {usingLocation === true ? (
                      <Stack justifyContent="center" flexDirection="row">
                        <LocationOnIcon />
                        <Typography>{location.addr}</Typography>
                      </Stack>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Stack>

                <Input
                  disabled={false}
                  fullWidth
                  value={message}
                  disableUnderline
                  onKeyUp={handleKeyUp}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-label="minimum height"
                  minRows={2}
                  placeholder="Write what you are feeling..."
                  multiline
                  sx={{
                    mt: 1,
                    borderRadius: "10px",
                    // border: "0.2px solid #f6f6f6",
                    padding: "10px 5px",
                    // background: "#f6f6f6",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                  }}
                  endAdornment={
                    <Stack sx={{ position: "relative" }}>
                      {/* <EmojiPicker
                        disabled={false}
                        value={message}
                        setValue={setMessage}
                        sx={{
                          zIndex: 100,
                          position: "absolute",
                          bottom: "5px",
                          right: "5px",
                        }}
                      /> */}
                      {/* <InputEmoji
                          value={message}
                          onChange={setMessage}
                          placeholder="Type a message"
                        /> */}

                      {/* <IconButton
                        disabled={false}
                        size="small"
                        // onClick={triggerPicker}
                      >
                        <Iconify
                          icon={"eva:smiling-face-fill"}
                          width={20}
                          height={20}
                        />
                      </IconButton> */}
                    </Stack>
                  }
                />
              </DialogContentText>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  // display:"none"
                }}
              >
                <Box
                  borderRadius={4}
                  sx={{
                    margin: "0",
                    /* maxHeight: "260px", */ overflow: "auto",
                  }}
                  // padding={1}
                  // border="1px solid #e5e0e0"
                >
                  <img width="100%" src={myIdol} alt=""></img>
                </Box>
                <IconButton
                  sx={{ position: "absolute", top: "2px", right: "7px" }}
                >
                  <StyledCloseIcon
                    sx={{
                      color: "#606770",
                      background: "rgba(255,255,255,.8)",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                </IconButton>
              </Box>
            </DialogContent>
            <DialogActions>
              <DialogContent>
                <Stack width="100%" flexDirection="column">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{
                      flexShrink: 0,
                      mr: 1.5,
                      width: "100%",
                      borderRadius: 4,
                      padding: 1,
                      border: "1px solid #e5e0e0",
                    }}
                  >
                    <Typography>Add to your post</Typography>
                    <Stack flexDirection="row">
                      <IconButton
                        disabled={false}
                        size="small"
                        onClick={handleAttach}
                      >
                        <Iconify
                          icon="ic:round-add-photo-alternate"
                          width={22}
                          height={22}
                        />
                      </IconButton>

                      <IconButton
                        disabled={false}
                        size="small"
                        onClick={handleOpenLocationBox}
                        sx={{
                          background:
                            usingLocation == true ? "rgb(236, 236, 250)" : "",
                        }}
                      >
                        <LocationOnIcon />
                      </IconButton>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    onClick={handleCloseSubmit}
                    sx={{ mt: 2, mb: 0 }}
                  >
                    Post
                  </Button>
                </Stack>
              </DialogContent>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
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

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  borderRadius: "50%",
  border: "1px solid #e5e0e0",
}));

const LocationFormControl = styled(CmmnFormControl)(({ theme }) => ({
  marginTop: "0px !important",
  width: "100%",
  "& .MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root": {
    marginTop: 0,
  },
}));
