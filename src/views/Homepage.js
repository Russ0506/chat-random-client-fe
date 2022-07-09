import { CssBaseline, Grid, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { DRAWER_WITH } from "../constant/css_constant";
import LeftSideBar from "./chat/leftBar/LeftSideBar";
import RightBar from "./chat/rightBar/RightBar";
import MessageLayout from "./chat/areaChat/MessageLayout";
import { appearanceSocket, newMessageSocket, msgLatestStatusSocket } from "./sockets/Socket";
import React, { useEffect } from "react";
import { receiveNewMessage } from "../features/chat/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectConversation } from "../features/chat/conversationSlice"

export default function Homepage() {
  const conversation = useSelector(selectConversation);
  const dispatch = useDispatch();
  const [openRightBar, setOpenRightBar] = React.useState(true);

  useEffect(() => {
    newMessageSocket();
    appearanceSocket();
    msgLatestStatusSocket();
  }, []);

  const handleOpenRightBar = () => {
    setOpenRightBar(!openRightBar);
  };

  return (
    <>
      {/* <Box w={100} sx={{ borderBottom: ".3px solid #e0e0e0" }}></Box> */}
      <Box sx={{ display: "flex", height: "100%" }} className="v11">
        <CssBaseline />
        <Box
          sx={{
            width: { sm: DRAWER_WITH },
            flexShrink: { sm: 0 },
            height: "100%",
            position: "relative",
            borderRight: "1px solid #e5e0e0",
          }}
        >
          <LeftSideBar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
            bgcolor: "white",
          }}
        >
          {/* <Toolbar /> */}
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={openRightBar === true ? 8.5 : 12}
              sx={{
                borderRight: "1px solid #e0e0e0",
                height: "100%",
              }}
            >
              <MessageLayout openBar={handleOpenRightBar} />
            </Grid>
            <Grid
              id="msg-right-bar-lt"
              item
              xs={openRightBar === true ? 3.5 : 0}
              sx={{
                transition: "all 0.2s ease",
                display: openRightBar === true ? "" : "none",
              }}
            >
              <RightBar />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
