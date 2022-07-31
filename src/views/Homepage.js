import {
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DRAWER_WITH, MB_LEFT_SIDEBAR_WIDTH } from "../constant/css_constant";
import LeftSideBar from "./chat/leftBar/LeftSideBar";
import RightBar from "./chat/rightBar/RightBar";
import MessageLayout from "./chat/areaChat/MessageLayout";
import {
  appearanceSocket,
  newMessageSocket,
  msgLatestStatusSocket,
} from "./sockets/Socket";
import React, { useEffect, useState } from "react";
import { receiveNewMessage } from "../features/chat/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/styles";

export default function Homepage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openRightBar, setOpenRightBar] = React.useState(
    isMobile ? false : true
  );
  const [openMbLeftBar, setOpenMbLeftBar] = React.useState(false);

  useEffect(() => {
    appearanceSocket();
    newMessageSocket();
    msgLatestStatusSocket();
    window.addEventListener(
      "resize",
      function (event) {
        if (window.innerWidth < 1200) {
          setOpenRightBar(false);
        } else {
          setOpenRightBar(true);
        }
      },
      false
    );
  }, []);

  const handleOpenRightBar = () => {
    setOpenRightBar(!openRightBar);
  };
  function closeRightBar() {
    setOpenRightBar(false);
  }

  function handleOpenMbLeftBar() {
    setOpenMbLeftBar(openMbLeftBar ? false : true);
  }
  function closeMbLeftBar() {
    setOpenMbLeftBar(false);
  }

  return (
    <>
      {/* <Box w={100} sx={{ borderBottom: ".3px solid #e0e0e0" }}></Box> */}
      <Box
        sx={{
          display: "flex",
          height: "100%",
          position: "relative",
          borderTop: "1px solid #e5e0e0",
          zIndex: 12,
        }}
        className="v11"
      >
        <CssBaseline />
        <Box
          sx={{
            width: DRAWER_WITH,
            flexShrink: { sm: 0 },
            height: "100%",
            position: { xs: "absolute", md: "relative" },
            left: { xs: openMbLeftBar ? 0 : "-320px", md: "0" },
            bottom: 0,
            background: "#fff",
            borderRight: "1px solid #e5e0e0",
            transition: "left 0.5s ease",
            zIndex: 12,
          }}
        >
          <LeftSideBar />
          <IconButton
            size="large"
            sx={{
              borderRadius: "0 15px 15px 0",
              position: "absolute",
              left: "100%",
              top: theme.spacing(1), 
              background: "rgb(236, 236, 250)",
              display: { xs: "", md: "none" },
            }}
            onClick={handleOpenMbLeftBar}
          >
            {openMbLeftBar ? (
              <CloseIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(103, 72, 218)",
                  opacity: { xs: "1", md: "0" },
                  transition: "all 0.5s ease",
                }}
              />
            ) : (
              <ChatIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  color: "rgb(103, 72, 218)",
                  opacity: { xs: "1", md: "0" },
                  transition: "all 0.5s ease",
                }}
              />
            )}
          </IconButton>
        </Box>
        <Box
          className={isMobile && openMbLeftBar ? "open-mb-left-bar" : ""}
          onClick={closeMbLeftBar}
        />
        <Box
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
            bgcolor: "white",
            zIndex: 10,
          }}
        >
          {/* <Toolbar /> */}
          <Grid
            container
            sx={{
              height: "100%",
              position: "relative",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Grid
              item
              xs={openRightBar && !isMobile === true ? 8.5 : 12}
              sx={{
                borderRight: "1px solid #e0e0e0",
                height: "100%",
                transition: "all 0.25s ease",
              }}
            >
              <MessageLayout openBar={handleOpenRightBar} />
            </Grid>
            <Grid
              id="msg-right-bar-lt"
              item
              xs={openRightBar && !isMobile === true ? 3.5 : 0}
              sx={{
                position: { xs: "absolute", md: "relative" },
                width: "100vw",
                height: "100%",
                maxWidth: "100vw",
                right:
                  (openRightBar && isMobile) || !isMobile === true
                    ? 0
                    : "-100%",
                bottom: 0,
                transition: "all 0.25s ease",
                // display: openRightBar === true ? "" : "none",
                zIndex: 20,
                background: "#fff",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  zIndex: 13,
                  display: isMobile ? "" : "none",
                }}
                onClick={closeRightBar}
              >
                <CloseIcon
                  sx={{ color: "#fff", height: "30px", width: "30px" }}
                />
              </IconButton>
              <RightBar />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
