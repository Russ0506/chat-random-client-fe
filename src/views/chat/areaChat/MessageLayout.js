import { Box, Divider, Grid, Stack } from '@mui/material';
import React from 'react';
import MessageChat from './message/MessageChat';
import ChatMessageInput from './sendMessageBox/ChatMessageInput';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { NewMessageSocket } from '../../sockets/Socket'
import { useDispatch, useSelector } from 'react-redux';
import ChatMessageList from './message/ChatMessageList';


// const conversationSelector = (state) => {
//   const { conversations, activeConversationId } = state.chat;
//   const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
//   if (conversation) {
//     return conversation;
//   }
//   const initState = {
//     id: '',
//     messages: [],
//     participants: [],
//     unreadCount: 0,
//     type: '',
//   };
//   return initState;
// };

function MessageLayout() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const { conversationKey } = useParams();
  // const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);
  // const conversation = useSelector((state) => conversationSelector(state));

  const activeConversationId = "123"
  const conversation = {
    id: "123",
    participants: [
      {
        id: "8864c717-587d-472a-929a-8e5f298024da-0",
        avatar: "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_15.jpg",
        name: "Jaydon Frankie",
        username: "jaydon.frankie"
      },
      {
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
        name: "Lucian Obrien",
        username: "lucian.obrien",
        avatar: "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_2.jpg",
        address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
        phone: "904-966-2836",
        email: "ashlynn_ohara62@gmail.com",
        lastActivity: "2022-06-25T03:22:38.918Z",
        status: "busy",
        position: "Full Stack Designer"
      }
    ],
    type: "ONE_TO_ONE",
    unreadCount: 0,
    messages: [
      {
        id: "45454151-801d-4517-b20c-3c2fb475bb2a",
        body: "Quis veniam aut saepe aliquid nulla.",
        contentType: "text",
        attachments: [
          "https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_2.jpg"
        ],
        createdAt: "2022-06-25T18:22:38.920Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
      },
      {
        id: "33496ad2-7063-4ed6-aa9a-4586d156f7ae",
        body: "Reprehenderit ut voluptas sapiente ratione nostrum est.",
        contentType: "text",
        attachments: [
          "https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_3.jpg"
        ],
        createdAt: "2022-06-26T02:22:38.920Z",
        senderId: "8864c717-587d-472a-929a-8e5f298024da-0"
      },
      {
        id: "a09bf72d-0cc2-4ad0-8493-047d2964b12e",
        body: "Error ut sit vel molestias velit.",
        contentType: "text",
        attachments: [
          "https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_12.mp4"
        ],
        createdAt: "2022-06-26T04:14:38.920Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
      },
      {
        id: "3eb45384-01ac-425e-8d31-0c93715beddb",
        body: "Quo quia sit nihil nemo doloremque et.",
        contentType: "text",
        attachments: [
          "https://mail.google.com/mail/u/file1.docx",
          "https://mail.google.com/mail/u/file2.xlsx",
          "https://mail.google.com/mail/u/file3.pptx"
        ],
        createdAt: "2022-06-26T04:16:38.920Z",
        senderId: "8864c717-587d-472a-929a-8e5f298024da-0"
      },
      {
        id: "24995b87-018f-4555-953b-8fae56216325",
        body: "Autem doloribus harum vero laborum.",
        contentType: "text",
        attachments: [
          "https://mail.google.com/mail/u/file4.pdf",
          "https://mail.google.com/mail/u/file5.psd",
          "https://mail.google.com/mail/u/file6.esp",
          "https://mail.google.com/mail/u/file7.sketch"
        ],
        createdAt: "2022-06-26T04:18:38.920Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
      },
      {
        id: "de791b81-ff35-4690-9894-7b03596ae1e9",
        attachments: [],
        contentType: "image",
        body: "https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_5.jpg",
        createdAt: "2022-06-26T04:20:38.920Z",
        senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2"
      },
      {
        id: "b6ccd872-8da4-4d42-a551-61f69c0496df",
        contentType: "text",
        body: "Tempora officiis consequuntur architecto nostrum autem nam adipisci.",
        attachments: [],
        createdAt: "2022-06-26T04:20:38.920Z",
        senderId: "8864c717-587d-472a-929a-8e5f298024da-0"
      },
    ]
  };

  console.log(conversation);

  const handleSendMessage = async (value) => {
    console.log(value);
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <NewMessageSocket />
      <Box sx={{ height: "50%" }}>
      
        <ChatMessageList conversation={conversation} />
      </Box>

      <Box sx={{ height: "50%" }}>
        <ChatMessageInput
          conversationId={activeConversationId}
          onSend={handleSendMessage}
          disabled={false}
        />
      </Box>

    </Box>
    )
};

export default MessageLayout;


  {/* <MessageChat
        avatar={''}
        messages={[
          'Hi Jenny, How r u today?',
          'Did you train yesterday',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
        ]}
      />
      <MessageChat
        side={'right'}
        messages={[
          "Great! What's about you?",
          'Of course I did. Speaking of which check this out',
        ]}
      />
      <MessageChat avatar={''} messages={['Im good.', 'See u later.']} /> */}


      // <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      //   <Stack sx={{ flexGrow: 1 }}>
      //     <ChatMessageList conversation={conversation} />

      //     <Divider />

      //     <ChatMessageInput
      //       conversationId={activeConversationId}
      //       onSend={handleSendMessage}
      //       disabled={false}
      //     />
      //   </Stack>

      //   {/* {mode === 'DETAIL' && <ChatRoom conversation={conversation} participants={displayParticipants} />} */}