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
  onOpenLightbox: PropTypes.func,
};

export default function ChatMessageItem({ message, onOpenLightbox }) {
  const myId = localStorage.getItem('user_id')
  const senderDetails =
    message.recipient_id != myId
      ? { type: 'me' }
      : { avatar: 'abc', name: 'name' };


  const isMessageSystem = message.is_system_message

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const isSenderSysMess = localStorage.getItem('user_id') == message.recipient_id
  return (
    <RootStyle>
      {isMessageSystem ? (isSenderSysMess ? (<Box className="custom-message-system">{message.text}</Box>) : <></>) : (
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
