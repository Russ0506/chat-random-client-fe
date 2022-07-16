import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Avatar, Stack, Typography } from "@mui/material";
import { onlineStatusSocket } from '../../../sockets/Socket'
import { selectOnlineStatus } from '../../../../features/chat/onlineStatusesSlice'
import { useSelector } from "react-redux";
import { selectLatestMessage } from '../../../../features/chat/messagesSlice'
import SmartClock from "../../../../utils/smartClock";

// + lastMsg :
//   -> {sender (true: you send msg/ false: partner send msg),
//   -> msg: content message,
//   -> read: (true: partner read, false: partner hasn't read)}
export default function Conversation({data}) {
  const onlineStatus = useSelector((state)=> {
    return selectOnlineStatus(state, data.partner?.id);
  })
  const updatedLastMessage = useSelector((state)=> {
    return selectLatestMessage(state, data.id);
  })

  useEffect(()=>{
    if (data.partner?.id) onlineStatusSocket(data.partner.id);
  }, [])

  const onlineInfo = () => {
    return onlineStatus || data.partner || {};
  }

  const lastMessageData = () => {
    return updatedLastMessage || data.last_message || {};
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: onlineInfo().is_online ? "#44b700" : "#ffc107",
      color: onlineInfo().is_online ? "#44b700" : "#ffc107",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation:
          data.partner?.is_online ? "ripple 1.5s infinite ease-in-out" : null,
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "10px 0",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt=""
              src="https://3.bp.blogspot.com/-eLFZ4fINjFk/Uq9hlFzEApI/AAAAAAAAG-4/3981yyTvKGM/s1600/28237d4dfe9baf20de1028f64f85ac68.jpg"
            />
          </StyledBadge>
          <Box sx={{ width: "calc(100% - 40px - 100px)" }}>
            <Typography variant="subtitle2">{data.partner.name}</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color:
                  lastMessageData().recipient_id == localStorage.getItem('user_id') && lastMessageData().status != 'seen'
                    ? "#817cce"
                    : "#c4c6ca",
                fontWeight:
                  lastMessageData().recipient_id == localStorage.getItem('user_id') && lastMessageData().status != 'seen'
                    ? "bold"
                    : "normal",
              }}
            >
              {lastMessageData().recipient_id == localStorage.getItem('user_id')
                ? lastMessageData().text
                : "you: " + lastMessageData().text}
            </Typography>
          </Box>
          <Stack
            sx={{ width: "100px", height: "40px", fontSize: "0.8rem" }}
            alignItems="flex-end"
            justifyContent="flex-end"
          ><SmartClock date={lastMessageData().created_at}/></Stack>
        </Stack>
      </Box>
    </>
  );
}
