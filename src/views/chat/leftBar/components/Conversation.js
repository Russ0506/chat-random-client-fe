import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Avatar, Stack, Typography } from "@mui/material";
import { selectOnlineStatus } from "../../../../features/chat/onlineStatusesSlice";
import { useSelector } from "react-redux";
import {
  selectLatestMessage,
  selectMsgLatestStatus,
} from "../../../../features/chat/messagesSlice";
import SmartClock from "../../../../utils/smartClock";
import { URL } from "../../../../service/chat.service";

const URL_IMAGE = `${URL}/api`;

// + lastMsg :
//   -> {sender (true: you send msg/ false: partner send msg),
//   -> msg: content message,
//   -> read: (true: partner read, false: partner hasn't read)}
export default function Conversation({ data }) {
  const onlineStatus = useSelector((state) => {
    return selectOnlineStatus(state, data.partner?.id);
  });

  const updatedLastMessage = useSelector((state) => {
    return selectLatestMessage(state, data.id);
  });

  const lastMessageStatus = useSelector((state) => {
    // console.log(updatedLastMessage || data.last_message)
    return selectMsgLatestStatus(
      state,
      updatedLastMessage || data.last_message
    );
  });
  // console.log(`${lastMessageStatus} ${(updatedLastMessage || data.last_message).text}`)

  const onlineInfo = () => {
    return onlineStatus || data.partner || {};
  };

  const lastMessageData = () => {
    let messageData = { ...(updatedLastMessage || data.last_message) };
    if (!messageData) return {};
    if (lastMessageStatus) messageData["status"] = lastMessageStatus;
    return messageData;
  };

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
        animation: data.partner?.is_online
          ? "ripple 1.5s infinite ease-in-out"
          : null,
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
              alt={data.partner.name}
              src={URL_IMAGE + data.partner.avatar_path}
            />
          </StyledBadge>
          <Box sx={{ width: "calc(100% - 40px)" }}>
            <Typography variant="subtitle2" component="div">
              {data.partner.name}
            </Typography>
            <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="space-between">
              <Typography
                component="div"
                variant="subtitle2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100px",
                  color:
                    lastMessageData().recipient_id ==
                      localStorage.getItem("user_id") &&
                    lastMessageData().status != "seen"
                      ? "#817cce"
                      : "#c4c6ca",
                  fontWeight:
                    lastMessageData().recipient_id ==
                      localStorage.getItem("user_id") &&
                    lastMessageData().status != "seen"
                      ? "bold"
                      : "normal",
                }}
              >
                {lastMessageData().recipient_id ==
                localStorage.getItem("user_id")
                  ? lastMessageData().text
                  : "you: " + lastMessageData().text}
              </Typography>
              <Typography
                component="p"
                variant="caption"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color: "#65676B",
                  fontWeight: "normal",
                  ml: 2,
                }}
              >
                <SmartClock date={lastMessageData().created_at} />
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
