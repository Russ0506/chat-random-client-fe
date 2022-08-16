import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ChatMessageInput from "./sendMessageBox/ChatMessageInput";
import { useSelector } from "react-redux";
import ChatMessageList from "./message/ChatMessageList";
import ChatHeaderDetail from "./title-chat/ChatHeaderDetail";
import { selectConversation } from "../../../features/chat/conversationSlice";
import { MB_LEFT_SIDEBAR_WIDTH } from "../../../constant/css_constant";
import ChatBg from "../../../assets/img/bigChat.png";
export default function MessageLayout({ openBar }) {
  const conversation = useSelector(selectConversation);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const renderChatHeader = () => {
    if (!conversation?.partner)
      return (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ opacity: "0.6", width: "100%", height: "100%" }}
        >
          <img
            src={ChatBg}
            alt=""
            height={isMobile ? "auto" : "80%"}
            width={isMobile ? "100%" : ""}
          ></img>
        </Stack>
      );
    return (
      <>
        <ChatHeaderDetail partner={conversation?.partner} openBar={openBar} />
        <ChatMessageList conversation={conversation} />
      </>
    );
  };
  const renderChatInput = () => {
    if (!conversation?.partner) return <></>;
    return <ChatMessageInput disabled={false} conversation={conversation} />;
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "0px",
      }}
    >
      <Box sx={{ height: "calc(100% - 70px)", width: "100%", pt: 0 }}>
        {renderChatHeader()}
      </Box>
      <Box sx={{ height: "60px", padding: "0px", paddingBottom: "10px" }}>
        {renderChatInput()}
      </Box>
    </Box>
  );
}
