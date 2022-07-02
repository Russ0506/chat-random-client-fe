import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import styles from "../../../../styles/chat.scss"

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

const MessageImgStyle = styled('img')(({ theme }) => ({
  height: 200,
  minWidth: 296,
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

// ----------------------------------------------------------------------

ChatMessageItem.propTypes = {
  // message: PropTypes.object.isRequired,
  // conversation: PropTypes.array.isRequired,
  onOpenLightbox: PropTypes.func,
};

export default function ChatMessageItem({ message, onOpenLightbox }) {
  const myId = 35
  //   conversation_id: 2
  // created_at: "23:01 25/06/2022"
  // id: 9
  // is_system_message: false
  // recipient_id: 35
  // seen_at: null
  // sender_id: 41
  // status: "sent"
  // text: "test"
  // const sender = conversation.participants.find((participant) => participant.id === message.senderId);
  // const senderDetails =
  //   message.senderId === '8864c717-587d-472a-929a-8e5f298024da-0'
  //     ? { type: 'me' }
  //     : { avatar: sender?.avatar, name: sender?.name };
  const senderDetails =
    // message.sender_id === myId
    //     ? { type: 'me' }
    //     : { avatar: sender?.avatar, name: sender?.name };
    message.recipient_id !== myId
      ? { type: 'me' }
      : { avatar: 'abc', name: 'name' };


  const isMessageSystem = message.is_system_message

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const isSenderSysMess = localStorage.getItem('user_id') == message.recipient_id
  // const firstName = senderDetails.name && senderDetails.name.split(' ')[0];
// console.log(new Date(message.created_at));
  return (
    <RootStyle>
      {isMessageSystem ? (
        isSenderSysMess ? (
          <Box className="custom-message-system">{message.text}</Box>
        ) : (
          <></>
        )
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              ...(isMe && {
                ml: "auto",
                marginRight: 2,
              }),
            }}
          >
            {senderDetails.type !== "me" && (
              // <Avatar alt={senderDetails.name} src={senderDetails.avatar} sx={{ width: 32, height: 32 }} />
              <Avatar sx={{ width: 40, height: 40 }} />
            )}

            <Box sx={{ ml: 2 }}>
              <ContentStyle
                sx={{
                  ...(isMe && {
                    color: "white",
                    // bgcolor: "#c8facd",
                    bgcolor: "#817cce",
                  }),
                  ...(!isMe && {
                    color: "text.primary",
                    // bgcolor: "#f4f6f8",
                    bgcolor: "#e9ecf1",
                  }),
                }}
              >
                {isImage ? (
                  <MessageImgStyle
                    alt="attachment"
                    src={message.text}
                    onClick={() => onOpenLightbox(message.text)}
                  />
                ) : (
                  <Typography variant="body2">{message.text}</Typography>
                )}
              </ContentStyle>
              <InfoStyle
                noWrap
                variant="caption"
                sx={{ ...(isMe && { justifyContent: "flex-end" }) }}
              >
                {/* {formatDistanceToNowStrict(new Date(message.created_at), {
              addSuffix: true,
            })} */}
                {message.created_at}
              </InfoStyle>
            </Box>
          </Box>
        </>
      )}
    </RootStyle>
  );
}
