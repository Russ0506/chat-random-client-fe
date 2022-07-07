import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ChatMessageInput from "./sendMessageBox/ChatMessageInput";
import { useSelector } from "react-redux";
import ChatMessageList from "./message/ChatMessageList";
import ChatHeaderDetail from "./title-chat/ChatHeaderDetail";
import moment from "moment";
import { selectConversation } from "../../../features/chat/conversationSlice"

export default function MessageLayout({openBar}){
  const conversation = useSelector(selectConversation);
  return (
    <Box sx={{ width: "100%", height: "100%", padding: "0px" }}>
      <Box
        sx={{ height: "calc(100% - 70px)", width: "100%", pl: 2, pt: 0 }}
      >
        <ChatHeaderDetail
          partner={conversation?.partner}
          openBar={openBar}
        />
        <ChatMessageList
          conversation={conversation}
        />
      </Box>
      <Box sx={{ height: "60px", padding: "0px", paddingBottom: "10px" }}>
        <ChatMessageInput
          disabled={false}
          conversation={conversation}
        />
      </Box>
    </Box>
  )
}
