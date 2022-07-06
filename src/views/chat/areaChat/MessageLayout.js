import { Box, Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import MessageChat from "./message/MessageChat";
import ChatMessageInput from "./sendMessageBox/ChatMessageInput";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatMessageList from "./message/ChatMessageList";
import ChatHeaderDetail from "./title-chat/ChatHeaderDetail";
import { loadConversation } from "../../../features/chat";
import moment from "moment";

function MessageLayout({ openBar, conversation, newMessage, ...res }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [conversationCurrentId, setConversationCurrentId] = React.useState();
  // const recipientId = 42;
  // const conversation = {
  //   id: 5,
  //   partner_id: 42,
  // };
  // const { conversationKey } = useParams();
  // const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);
  // const conversation = useSelector((state) => conversationSelector(state));

  const participants = [
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      avatar:
        "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg",
      name: "Harrison Stein",
      username: "harrison.stein",
      address: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
      phone: "692-767-2903",
      email: "violet.ratke86@yahoo.com",
      position: "UX Designer",
      status: "true",
      last_online: "2022-06-23T04:44:07.656Z",
    },
  ];

  const displayParticipants = participants.filter(
    (item) => item.id !== "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
  );

  const [newMessages, setNewMessages] = React.useState([]);
  const handleSendMessage = async (value) => {
    setNewMessages([
      ...newMessages,
      {
        id: value.id ? value.id : 0,
        conversation_id: value.conversationId,
        sender_id: null,
        recipient_id: value.recipient_id,
        text: value.text,
        created_at: moment().format(),
        status: null,
        is_system_message: false,
      },
    ]);
    console.log("called handleSendMessage");
    var element = document.getElementById("chat-scroll-ult");
    element.scrollTop = element.scrollHeight;
  };
    // useEffect(()=> {
    //   dispatch(loadConversation({conversation_id : 5})) .then((data) => {
    //     // console.log(data);
    //     setMockDataConversation(data);
    //   })
    //   .catch(() => {
    //   });
    // }, [])

    useEffect(() => {
      if (newMessage != undefined) {
        handleSendMessage(newMessage);
      }
    }, [newMessage])

    return (
      <Box sx={{ width: "100%", height: "100%", padding: "0px" }}>
        <Box
          sx={{ height: "calc(100% - 70px)", width: "100%", pl: 2, pt: 0 }}
        >
          <ChatHeaderDetail
            participants={displayParticipants}
            openBar={openBar}
          />
          <ChatMessageList
            newMessages={newMessages}
            conversation={conversation}
          />
        </Box>
        {/* <Divider /> */}
        <Box sx={{ height: "60px", padding: "0px", paddingBottom: "10px" }}>
          <ChatMessageInput
            disabled={false}
            conversation={conversation}
            onSend={handleSendMessage}
            recipientId={conversation.partner_id}
          />
        </Box>
      </Box>
    );
  }

  export default MessageLayout
