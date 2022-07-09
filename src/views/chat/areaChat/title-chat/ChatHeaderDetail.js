import PropTypes from "prop-types";
// import { capitalCase } from 'change-case';
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Avatar,
  Typography,
  AvatarGroup,
  IconButton,
} from "@mui/material";
import BadgeStatus from "../../../common/base/status/BadgeStatus";
import Iconify from "../../../common/base/icon/Iconify";

// utils
import { fToNow } from "../../../../utils/formatTime";
import { CHAT_HEADER_HEIGHT } from "../../../../constant/css_constant";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  flexShrink: 0,
  minHeight: CHAT_HEADER_HEIGHT,
  display: "flex",
  alignItems: "center",
}));

export default function ChatHeaderDetail({ openBar, partner }) {
  // const isGroup = partners.length > 1;
  // const handleOpenShareInfoLayout = async () => {
  //   openBar(false);
  // };
  return (
    <RootStyle>
      <OneAvatar partner={partner} />

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

// ----------------------------------------------------------------------

// OneAvatar.propTypes = {
//   partner: PropTypes.object.isRequired,
// };

function OneAvatar({ partner }) {

  if (partner === undefined || !partner.is_online) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={partner.avatar}
          alt={partner.name}
          style={{ width: 52, height: 52 }}
        />
        <BadgeStatus
          status={partner.is_online}
          sx={{ position: "absolute", right: 2, bottom: 2 }}
        />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{partner.name}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {/* {partner.status !== 'offline' ? capitalCase(partner.status) : fToNow(partner.lastActivity || '')} */}
          {partner.is_online !== "false"
            ? "Online"
            : fToNow(partner.last_online || "")}
        </Typography>
      </Box>
    </Box>
  );
}
