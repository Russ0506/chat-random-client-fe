import React from 'react';
import PropTypes from 'prop-types';
import styles from "../../../../styles/chat.scss"
import SmartClock from "../../../../utils/smartClock";
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import MessageStatus from './MessageStatus';
import { selectMsgLatestStatus } from '../../../../features/chat/messagesSlice'
import { useSelector } from 'react-redux';
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

export default function ChatMessageItem({ message, onOpenLightbox, nextMessage, avatarPath, name }) {
  const [showHistoryTimeFlg, setShowHistoryTimeFlg] = React.useState(false)

  const lastestMsgStatus = useSelector((state) => {
    return selectMsgLatestStatus(state, message)
  });

  const lastestMsgStatusOfNextMsg = useSelector((state) => {
    return selectMsgLatestStatus(state, nextMessage);
  });

  const nextMessageStatus = () => {
    return lastestMsgStatusOfNextMsg || nextMessage?.status;
  }

  const myId = localStorage.getItem('user_id')
  const senderDetails =
    message.recipient_id != myId
      ? { type: 'me' }
      : { avatar: 'abc', name: 'name' };

  const isMessageSystem = message.is_system_message

  const isMe = senderDetails.type === 'me';
  const isImage = message.attachment_path?.length > 0;
  const isSenderSysMess = localStorage.getItem('user_id') == message.recipient_id

  function showHistoryTime(id) {
    setShowHistoryTimeFlg(true);
    var element = document.getElementById(id);
    if (element.classList.contains("non-block")) {
      element.classList.remove = "non-block";
      element.className = "block custom-message-system";
    } else {
      element.classList.remove = "block";
      element.className = "non-block custom-message-system";
    }
  };

  function showTimeSending(id) {

  }
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
              position: "relative",
              display: "flex",
              ...(isMe && {
                ml: "auto",
                marginRight: 2,
              }),
            }}
          >
            {senderDetails.type !== "me" && (
              // <Avatar alt={senderDetails.name} src={senderDetails.avatar} sx={{ width: 32, height: 32 }} />
              <Avatar  alt={name} src={avatarPath} sx={{ width: 40, height: 40 }} />
            )}

            <Tooltip
              disableFocusListener
              placement="left"
              title={<SmartClock date={message.created_at} />}
              enterDelay={500}
            >
              <Box
                sx={{ ml: 2, position: "relative", ...{ marginRight: "17px" } }}
              >
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
                    width: "max-content",
                    wordWrap: "break-word",
                  }}
                >
                  {isImage && (
                    <MessageImgStyle
                      alt="attachment"
                      src={message.is_new_message ? message.attachment_path : `/api${message.attachment_path}`}
                      onClick={() => onOpenLightbox(message.text)}
                    />
                  )}
                    <Typography variant="body2" sx={{ marginTop: '8px' }}>{message.text}</Typography>
                </ContentStyle>
              </Box>
            </Tooltip>
            {isMe ? (
              <MessageStatus
                avatarPath = {avatarPath}
                // name = {name}
                status={lastestMsgStatus || message.status}
                showSeen={nextMessageStatus() != "seen"}
              />
            ) : (
              ""
            )}
          </Box>
        </>
      )}
    </RootStyle>
  );
}
