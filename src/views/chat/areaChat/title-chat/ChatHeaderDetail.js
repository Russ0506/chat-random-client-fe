import PropTypes from "prop-types";
// import { capitalCase } from 'change-case';
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import BadgeStatus from "../../../common/base/status/BadgeStatus";
import Iconify from "../../../common/base/icon/Iconify";
import { CHAT_HEADER_HEIGHT } from "../../../../constant/css_constant";
import { selectOnlineStatus } from '../../../../features/chat/onlineStatusesSlice'
import { useSelector } from "react-redux";
import { useState } from "react";
import { fToNow } from "../../../../utils/formatTime";
import { DateDistanceCustom } from "../../../common/time/dateDiff";

const RootStyle = styled("div")(({ theme }) => ({
  flexShrink: 0,
  minHeight: CHAT_HEADER_HEIGHT,
  display: "flex",
  alignItems: "center",
  boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 2px 0px'
}));

export default function ChatHeaderDetail({ openBar, partner }) {
  const [counter, setCounter] = useState(0)
  const onlineStatus = useSelector((state)=> {
    return selectOnlineStatus(state, partner.id)
  })

  useState(()=>{
    setInterval(()=>{
      setCounter(counter => counter + 1);
    }, 60000);
  }, [counter])

  useState(()=>{
  }, [onlineStatus])

  const data = () => {
    return onlineStatus || partner;
  }

  // const offFrom = () => {
  //   if (data().last_online && data().last_online !== ""){
  //     return fToNow(data().last_online);
  //   } else {
  //     return ""
  //   }
  // }

  return (
    <RootStyle>
      <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={partner.avatar}
            alt={partner.name}
            style={{ width: 52, height: 52 }}
          />
          <BadgeStatus
            status={data().is_online}
            sx={{ position: "absolute", right: 2, bottom: 2 }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{partner.name}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data().is_online ? "Online" :  DateDistanceCustom(data().last_online)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <Iconify icon="eva:phone-fill" width={22} height={22} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:video-fill" width={22} height={22} />
      </IconButton>
      <IconButton onClick={openBar}>
        <Iconify icon="mdi:information" width={22} height={22} />
      </IconButton>
    </RootStyle>
  );
}
