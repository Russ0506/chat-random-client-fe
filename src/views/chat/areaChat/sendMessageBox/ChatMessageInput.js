import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { Stack, Input, IconButton, Box } from "@mui/material";
import Iconify from "../../../common/base/icon/Iconify";
import EmojiPicker from "../../../common/base/emoji/EmojiPicker";
import { sendNewMessage } from "../../../../features/chat/messagesSlice";
import { touchConversation } from "../../../../features/chat/conversationSlice";
import StyledCloseIcon from "../../../common/base/style-icon/StyledCloseIcon";

export default function ChatMessageInput({ disabled, conversation }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [src, setSrc] = useState(null);
  const [srcUrl, setSrcUrl] = useState(null);
  const curentConversation = useSelector((state) => state.conversation);

  useEffect(() => {
    clearImage();
  }, [curentConversation]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setSrcUrl(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setSrc(null);
    setSrcUrl(null);
    document.getElementById("file-input").value = null;
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    let params = {};
    if (!src && (!message || message.trim() === "")) {
      return "";
    }

    if (conversation?.id) {
      if (srcUrl) {
        params = {
          conversationId: conversation.id,
          text: message,
          attachment: srcUrl || null,
          attachment_path: src,
          is_new_message: true,
          recipient_id: conversation.partner.id,
          created_at: moment().format()
        };
        dispatch(sendNewMessage(params));
      } else {
        params = {
          conversationId: conversation.id,
          text: message,
          recipient_id: conversation.partner.id,
          created_at: moment().format(),
        };
        dispatch(sendNewMessage(params));
      }

      var element = document.getElementById("chat-scroll-ult");
      element.scrollTop = element.scrollHeight;
    }

    if (conversation.id)
      dispatch(touchConversation({ conversationId: conversation.id }));
    return setMessage("");
  };

  return (
    <RootStyle>
      {src ? (
        <Box className="image-contain">
          <Box
            sx={{
              margin: "0",
              overflow: "auto",
            }}
          >
            <img
              value="src"
              alt="Crop"
              width="20%"
              borderRadius="5px"
              src={src}
            />
          </Box>
          <IconButton sx={{ position: "absolute", top: "2px", left: "7px" }}>
            <StyledCloseIcon
              onClick={clearImage}
              sx={{
                color: "#606770",
                background: "rgba(255,255,255,.8)",
                width: "25px",
                height: "25px",
              }}
            />
          </IconButton>
        </Box>
      ) : (
        ""
      )}
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        sx={{
          borderRadius: "10px",
          border: "0.2px solid #f6f6f6",
          paddingLeft: "15px",
          paddingTop: "5px",
          paddingBottom: "5px",
          // background: "#f6f6f6",
          background: "#f4f7fa",
        }}
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton disabled={disabled} size="small" onClick={onSelectFile}>
              <label htmlFor="file-input" style={{ margin: 0, padding: 0 }}>
                <Iconify
                  icon="ic:round-add-photo-alternate"
                  width={22}
                  height={22}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                id="file-input"
                className="upload"
                onChange={onSelectFile}
                hidden
              />
            </IconButton>

            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
              sx={{ zIndex: 11 }}
            />
            <IconButton disabled={disabled} size="small">
              <Iconify icon="eva:mic-fill" width={22} height={22} />
            </IconButton>
          </Stack>
        }
      />

      <IconButton
        color="primary"
        disabled={!src && (!message || message.trim() === "")}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Iconify icon="ic:round-send" width={25} height={25} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
    </RootStyle>
  );
}

const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 56,
  display: "flex",
  position: "relative",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  height: "100%",
  borderTop: "1px solid #ebebeb",
}));
