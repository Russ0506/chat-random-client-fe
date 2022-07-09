import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { Stack, Input, IconButton } from "@mui/material";
import Iconify from "../../../common/base/icon/Iconify";
import EmojiPicker from "../../../common/base/emoji/EmojiPicker";
import { sendNewMessage } from "../../../../features/chat/messagesSlice";

export default function ChatMessageInput({ disabled, conversation }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const handleAttach = () => {
    fileInputRef.current?.click();
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

    if (conversation?.id) {
      let params = {
        conversationId: conversation.id,
        text: message,
        recipient_id: conversation.partner.id,
        create_at: moment().format(),
      };
      dispatch(sendNewMessage(params));
      var element = document.getElementById("chat-scroll-ult");
      element.scrollTop = element.scrollHeight;
    }
    return setMessage("");
  };

  return (
    <RootStyle>
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
          background: "#f6f6f6",
        }}
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Iconify
                icon="ic:round-add-photo-alternate"
                width={22}
                height={22}
              />
            </IconButton>
            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
              sx={{ zIndex: 100 }}
            />
            <IconButton disabled={disabled} size="small">
              <Iconify icon="eva:mic-fill" width={22} height={22} />
            </IconButton>
          </Stack>
        }
      />
      <IconButton
        color="primary"
        disabled={!message}
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
}));
