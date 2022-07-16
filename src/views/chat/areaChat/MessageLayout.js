import { Box } from "@mui/material";
import React from "react";
import ChatMessageInput from "./sendMessageBox/ChatMessageInput";
import { useSelector } from "react-redux";
import ChatMessageList from "./message/ChatMessageList";
import ChatHeaderDetail from "./title-chat/ChatHeaderDetail";
import { selectConversation } from "../../../features/chat/conversationSlice";
import { MB_LEFT_SIDEBAR_WIDTH } from "../../../constant/css_constant";

export default function MessageLayout({ openBar }) {
  const conversation = useSelector(selectConversation);

  const renderChatHeader = () => {
    if (!conversation?.partner) return(<></>);
    return (
      <ChatHeaderDetail partner={conversation?.partner} openBar={openBar} />
    )
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "0px",
        paddingLeft: { xs: `${MB_LEFT_SIDEBAR_WIDTH}px`, md: "0" },
      }}
    >
      <Box sx={{ height: "calc(100% - 70px)", width: "100%", pt: 0 }}>
        { renderChatHeader() }
        <ChatMessageList conversation={conversation} />
      </Box>
      <Box sx={{ height: "60px", padding: "0px", paddingBottom: "10px" }}>
        <ChatMessageInput disabled={false} conversation={conversation} />
      </Box>
    </Box>
  );
}
