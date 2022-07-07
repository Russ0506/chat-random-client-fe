import React from 'react';
import PropTypes from 'prop-types';
import styles from "../../../../styles/chat.scss"
import { formatDistanceToNowStrict } from 'date-fns';
import { format } from 'date-fns'
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import Iconify from '../../../common/base/icon/Iconify';
import image from "../../../../assets/img/find-partner.jpg"

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

  inDays: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inWeeks: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },

  inMonths: function (d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  }
}

const Switch = props => {
  const { test, children } = props
  // filter out only children with a matching prop
  return children.find(child => {
    return child.props.value === test
  })
}

export default function ChatMessageItem({ message, onOpenLightbox }) {
  const listStatus = ['sending', 'sent', 'received', 'seen']
  const [showHistoryTimeFlg, setShowHistoryTimeFlg] = React.useState(false)
  const [statusMess, setStatusMess] = React.useState("sending")
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

  function showHistoryTime(id) {
    setShowHistoryTimeFlg(true);
    var element
    if (id == '0') {
      element = document.getElementsByClassName("" + id);
      console.log(document.getElementsByTagName(id));
      if (element[0].className.contains("non-block")) {
        console.log("1");
        for (const box of element) {
          console.log(box.classList);
          box.classList.remove = "non-block";
          box.classList.add = "block custom-message-system 0";
        }
      } else {
        for (const box of element) {
          box.classList.remove = "block";
          box.classList.add = "non-block custom-message-system 0";
        }
      }
    }
    else {
      element = document.getElementById(id);
      console.log(element);
      console.log(element.className);
      if (element.classList.contains("non-block")) {
        console.log("1");
        element.classList.remove = "non-block";
        element.className = "block custom-message-system";
      } else {
        element.classList.remove = "block";
        element.className = "non-block custom-message-system";
      }
    }
  };
  return (
    <RootStyle>
      {isMessageSystem ? (isSenderSysMess ? (<Box className="custom-message-system">{message.text}</Box>) : <></>) : (
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
              <Avatar sx={{ width: 40, height: 40 }} />
            )}

            <Box sx={{ ml: 2, position: "relative", ...({ marginRight: "17px" }) }} onClick={() => showHistoryTime(message.id)}>
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
              <Box sx={{ ...(isMe && { position: "absolute", right: "5px" }), ...(!isMe && { position: "absolute", left: "5px" }) }}>
                <InfoStyle
                  noWrap
                  variant="caption"
                  sx={{ ...(isMe && { justifyContent: "flex-end", width: "max-content" }) }}
                  id={message.id}
                  className={`init-history-date non-block ${message.id}`}
                  name={message.id}
                >
                  {(message.created_at && showHistoryTimeFlg) ? (
                    (DateDiff.inDays(new Date(message.created_at), new Date()) < 3) ? formatDistanceToNowStrict(new Date(message.created_at), { addSuffix: true }) : format(new Date(message.created_at), 'MM-dd-yyyy')
                  ) : ''}
                </InfoStyle>
              </Box>
            </Box>
            {
              isMe ? (
                <Switch test={statusMess}>
                  <div className="config-position-icon" value={listStatus[0]}><CheckCircleOutlineIcon sx={{width: "16px"}} /> </div>
                  <div className="config-position-icon" value={listStatus[1]}><CheckCircleIcon sx={{width: "16px"}}/></div>
                  <div className="config-position-icon" value={listStatus[2]}><CircleOutlinedIcon sx={{width: "16px"}}/></div>
                  <div className="config-position-icon" value={listStatus[3]}>
                  <Box className="config-position-icon-seen">
                   <img src={image} className="avatar-circle" width="16px" height="16px"></img>
                  </Box>
                  </div>
                </Switch>

              ) : ''
            }
          </Box>
        </>
      )}
    </RootStyle>
  );
}
