import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { format } from 'date-fns'
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import styles from "../../../../styles/chat.scss"
import React from 'react';

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

var DateDiff = {
 
  inDays: function(d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.floor((t2-t1)/(24*3600*1000));
  },

  inWeeks: function(d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return parseInt((t2-t1)/(24*3600*1000*7));
  },

  inMonths: function(d1, d2) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return (d2M+12*d2Y)-(d1M+12*d1Y);
  },

  inYears: function(d1, d2) {
      return d2.getFullYear()-d1.getFullYear();
  }
}

export default function ChatMessageItem({ message, onOpenLightbox }) {
  console.log("Test Ly", message.create_at);
  const myId = localStorage.getItem('user_id')
  const senderDetails =
    message.recipient_id != myId
      ? { type: 'me' }
      : { avatar: 'abc', name: 'name' };


  const isMessageSystem = message.is_system_message

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const isSenderSysMess = localStorage.getItem('user_id') == message.recipient_id
  // function GetDiffTime(props) {
  //   const [result, setResult] = React.useState("");
  //   if(props.past_time){
  //     setResult(formatDistanceToNowStrict(new Date(props.past_time), {addSuffix: true}))
  //   }
  //   return result
  // }
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
                  <Typography variant="body2">{message.text + message.create_at}</Typography>
                )}
              </ContentStyle>
              <InfoStyle
                noWrap
                variant="caption"
                sx={{ ...(isMe && { justifyContent: "flex-end" }) }}
              >
                {(message.created_at) ? (
                  (DateDiff.inDays(new Date(message.created_at), new Date()) < 3) ? formatDistanceToNowStrict(new Date(message.created_at), {addSuffix: true}) : format(new Date(message.created_at), 'MM/dd/yyyy')
                  ) : ''}
                 {/* <GetDiffTime past_time={message.created_at} /> */}
                
                  {/* {formatDistanceToNowStrict(new Date("2022-07-03T14:51:34+07:00"), {addSuffix: true})} */}
              </InfoStyle>
            </Box>
          </Box>
        </>
      )}
    </RootStyle>
  );
}
