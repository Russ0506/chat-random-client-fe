import { Box, Divider, Grid, Stack } from '@mui/material';
import React, { useEffect, useLayoutEffect } from 'react';
import MessageChat from './message/MessageChat';
import ChatMessageInput from './sendMessageBox/ChatMessageInput';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { NewMessageSocket } from '../../sockets/Socket'
import { useDispatch, useSelector } from 'react-redux';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderDetail from './title-chat/ChatHeaderDetail';
import { loadConversation } from '../../../features/chat';

function MessageLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [conversationCurrentId, setConversationCurrentId] = React.useState();
  const recipientId = 42
  const conversation = {
    id: 5,
    partner_id: 42
  }
  // const { conversationKey } = useParams();
  // const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);
  // const conversation = useSelector((state) => conversationSelector(state));

  const activeConversationId = "123"
  const conversation1 = {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
    "participants": [
      {
        id: "8864c717-587d-472a-929a-8e5f298024da-0",
        avatar:
          "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_15.jpg",
        name: "Jaydon Frankie",
        username: "jaydon.frankie",
      },
      {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
        name: "Harrison Stein",
        username: "harrison.stein",
        avatar:
          "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg",
        address: "110 Lamar Station Apt. 730 - Hagerstown, OK / 49808",
        phone: "692-767-2903",
        email: "violet.ratke86@yahoo.com",
        lastActivity: "2022-06-23T04:44:07.656Z",
        status: "busy",
        position: "UX Designer",
      },
    ],
    type: "ONE_TO_ONE",
    unreadCount: 0,
    messages: [
      {
        id: "569fde49-3a36-4859-a5ca-7d5dc597de70",
        body: "At ut voluptate accusantium.",
        contentType: "text",
        attachments: [],
        createdAt: "2022-06-25T23:44:07.657Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      },
      {
        id: "44829a6b-8457-4f16-9ab3-c2a5f025e612",
        body: "Repudiandae ut qui veritatis sint.",
        contentType: "text",
        attachments: [],
        createdAt: "2022-06-26T01:44:07.657Z",
        senderId: "8864c717-587d-472a-929a-8e5f298024da-0",
      },
      {
        id: "c61f19b3-4f54-414c-8855-00990d3e474d",
        body: "Laboriosam blanditiis quo sed et qui esse ipsam necessitatibus sed.",
        contentType: "text",
        attachments: [],
        createdAt: "2022-06-26T03:14:07.657Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      },
      {
        id: "877d61d8-c7dc-40db-9add-9127ce120d7c",
        body: "Et molestiae et excepturi maxime omnis.",
        contentType: "text",
        attachments: [],
        createdAt: "2022-06-26T05:29:07.657Z",
        senderId: "8864c717-587d-472a-929a-8e5f298024da-0",
      },
      {
        id: "39ebb204-71f2-423c-b06a-5ace19799202",
        body: "Sint dolorem quam eum magnam.",
        contentType: "text",
        attachments: [],
        createdAt: "2022-06-26T06:29:07.657Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      },
      {
        id: "e2bacaf5-3305-4fc1-b6fa-8f03d9b6e64a",
        body: "https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_6.jpg",
        contentType: "image",
        attachments: [],
        createdAt: "2022-06-26T06:44:07.657Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      },
      {
        id: "9a3fbb8d-2608-4967-a26b-806b9aac4b39",
        body: "https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_7.jpg",
        contentType: "image",
        attachments: [],
        createdAt: "2022-06-26T06:44:07.657Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      },
    ],
  };

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
      status: "false",
      last_online: "2022-06-23T04:44:07.656Z",
    },
  ];

  const displayParticipants = participants.filter((item) => item.id !== 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2');

  const [newMessages, setNewMessages] = React.useState([]);
  const handleSendMessage = async (value) => {
    setNewMessages([...newMessages,
      {
        id: 0,
        conversation_id: value.conversationId,
        sender_id: null,
        recipient_id: value.recipient_id,
        text: value.text,
        status: null,
        is_system_message: false
      }
    ])
    console.log('called handleSendMessage')
  };

  // useEffect(()=> {
  //   dispatch(loadConversation({conversation_id : 5})) .then((data) => {
  //     // console.log(data);
  //     setMockDataConversation(data);
  //   })
  //   .catch(() => {
  //   });
  // }, [])


  return (
    <Box sx={{ width: "100%", height: "100%", padding: "0px" }}>
      <NewMessageSocket />
      <Box className="adss" sx={{ height: "calc(100% - 70px)", width: "100%", pl: 2, pt: 0 }}>
        <ChatHeaderDetail participants={displayParticipants} />
        <ChatMessageList conversation1={conversation1} newMessages={newMessages} conversation={conversation} />
      </Box>
      {/* <Divider /> */}
      <Box sx={{ height: "60px", padding: "0px", paddingBottom: "10px" }}>
        <ChatMessageInput
          disabled={false}
          conversation={conversation}
          onSend={handleSendMessage}
          recipientId={recipientId}
        />
      </Box>
    </Box>
  );
}

export default MessageLayout;
