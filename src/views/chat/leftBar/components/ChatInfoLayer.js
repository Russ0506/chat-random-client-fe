import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Avatar, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import moment from "moment";

// partner information include
// + parnerId, partnerNm, parnerAvatar(avatar),
// + partnerStatus (online/offline), lastOnlineTm(yyyyMMddHHmmss/null)
// + lastMsg :
//   -> {sender (true: you send msg/ false: partner send msg),
//   -> msg: content message,
//   -> read: (true: partner read, false: partner hasn't read)}
export default function ChatInfoLayer(props) {
  // ==== option: ==== //
  // -- op1: time offline
  // [format:
  //  +-- time offline < 1h --> "mm mins"
  //  +-- time offline < 1 day --> hh hours
  //  +-- time offline = 1 day --> 01 day
  //  +-- time offline > 1 day --> dd days
  // ]
  const [offTime, setOffTime] = React.useState("");
  const [data, setData] = React.useState(props.data);

  function difference2Parts(milliseconds, typeOfTm) {
    let secs, mins, hours;
    // case condition to display time difference.
    switch (typeOfTm) {
      case 0: // diff count by miliseconds
        return Math.floor(Math.abs(milliseconds)) % 1000;
      case 1: // diff count by seconds
        return Math.floor(Math.abs(milliseconds) / 1000);
      case 2: // diff count by minutes
        secs = Math.floor(Math.abs(milliseconds) / 1000);
        return Math.floor(secs / 60);
      case 3: // diff count by hours
        secs = Math.floor(Math.abs(milliseconds) / 1000);
        mins = Math.floor(secs / 60);
        return Math.floor(mins / 60);
      case 4: // diff count by days
        secs = Math.floor(Math.abs(milliseconds) / 1000);
        mins = Math.floor(secs / 60);
        hours = Math.floor(mins / 60);
        return Math.floor(hours / 24);
      default:
        return null;
    }
  }
  function offlineTmDiff() {
    const offTm = new Date(
      new Date(moment(data.lastOnlineTm, "YYYYMMDDhhmmss").format())
    );

    const diff = () => {
      const diffs = difference2Parts(offTm - new Date(), 2);
      // case offline time < 1 minute -> display 1 minute only
      if (diffs <= 1) {
        setOffTime("1 minute");
      }
      // case offline time < 60 minutes -> display n minutes
      else if (diffs < 60) {
        setOffTime(diffs + " minutes");
      }
      // case offline time between 60m <= time < 120m
      else if (60 <= diffs && diffs < 120) {
        setOffTime("1 hour");
      }
      // case onffline time between 60m <= time < 120m -> display off line n hours
      else if (120 <= diffs && diffs < 1440) {
        setOffTime(difference2Parts(offTm - new Date(), 3) + " hours");
      } else if (diffs <= 1440 && diff < 2880) {
        setOffTime("1 day");
      } else if (diffs <= 2880) {
        setOffTime(difference2Parts(offTm - new Date(), 4) + " days");
      }
      setTimeout(diff, 500);
    };
    return diff();
  }

  const shapeStyles = {
    bgcolor: "primary.main",
    width: 12,
    height: 12,
    marginTop: 1,
  };
  const shapeCircleStyles = { borderRadius: "50%" };
  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
  );

  useEffect(() => {
    offlineTmDiff();
  }, [offTime]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: data.status == "online" ? "#44b700" : "#ffc107",
      color: data.status == "online" ? "#44b700" : "#ffc107",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation:
          data.status == "online" ? "ripple 1.5s infinite ease-in-out" : null,
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
              alt="Remy Sharp"
              src="https://3.bp.blogspot.com/-eLFZ4fINjFk/Uq9hlFzEApI/AAAAAAAAG-4/3981yyTvKGM/s1600/28237d4dfe9baf20de1028f64f85ac68.jpg"
            />
          </StyledBadge>
          <Box sx={{ width: "calc(100% - 40px - 100px)" }}>
            <Typography variant="subtitle2">{data.partnerNm}</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color:
                  data.lastMsg.sender == false && data.lastMsg.read == false
                    ? "#817cce"
                    : "#c4c6ca",
                fontWeight:
                  data.lastMsg.sender == false && data.lastMsg.read == false
                    ? "bold"
                    : "normal",
              }}
            >
              {data.lastMsg.sender == false
                ? data.lastMsg.msg
                : "you: " + data.lastMsg.msg}
            </Typography>
          </Box>
          <Stack
            sx={{ width: "100px", height: "40px" }}
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            <Typography variant="caption">
              {data.status == "online" ? "" : offTime}
            </Typography>
            {/* <Badge
            // color="secondary"
            // overlap="circular"
            // badgeContent=" "
            // variant="dot "
            >
              {circle}
            </Badge> */}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
