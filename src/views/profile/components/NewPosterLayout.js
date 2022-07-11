import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import myIdol from "../components/img/myidol.jpg";
import { styled } from "@mui/styles";
import { IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import { Box, Container, margin } from "@mui/system";
import Iconify from "../../common/base/icon/Iconify";
import EmojiPicker from "../../common/base/emoji/EmojiPicker";
// import { touchConversation } from "../../../features/chat/conversationSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NewPosterLayout(props) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const [message, setMessage] = useState("");
  const handleAttach = () => {
    fileInputRef.current?.click();
  };
  const handleKeepWaiting = () => {
    // props.oncloseModal();
    setOpen(false);
  };

  const handleCancelWaiting = () => {
    // props.oncloseModal();
    // props.onCanclPairing();
    setOpen(false);
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

    // if (conversation?.id) {
    //   let params = {
    //     conversationId: conversation.id,
    //     text: message,
    //     recipient_id: conversation.partner.id,
    //     created_at: moment().format(),
    //   };
    //   dispatch(sendNewMessage(params));
    //   var element = document.getElementById("chat-scroll-ult");
    //   element.scrollTop = element.scrollHeight;
    // }

    // if (conversation.id)
    //   dispatch(touchConversation({ conversationId: conversation.id }));
    // return setMessage("");
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleKeepWaiting}
        aria-describedby="alert-dialog-slide-description"
        id="des-txtarea-desc"
      >
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Stack
              className="ct-pt-title"
              flexDirection="row"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <AvatarFrame />
              <Typography variant="h6" sx={{ fontWeight: 550, ml: 1 }}>
                Tuong Vy Bui Anh
              </Typography>
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
                <>
                  <EmojiPicker
                    disabled={false}
                    value={message}
                    setValue={setMessage}
                    sx={{
                      zIndex: 100,
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                    }}
                  />
                </>
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
              sx={{ margin: "0", maxHeight: "260px", overflow: "auto" }}
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
                margin: "5px 0",
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

                <IconButton disabled={false} size="small">
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
              onClick={handleKeepWaiting}
              sx={{ mt: 2, mb: 1 }}
            >
              Post
            </Button>
          </Stack>
        </DialogActions>
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
