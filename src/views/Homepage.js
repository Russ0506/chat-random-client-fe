import {
  CssBaseline,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DRAWER_WITH, MB_LEFT_SIDEBAR_WIDTH } from "../constant/css_constant";
import LeftSideBar from "./chat/leftBar/LeftSideBar";
import RightBar from "./chat/rightBar/RightBar";
import MessageLayout from "./chat/areaChat/MessageLayout";
import React, { useEffect, useState } from "react";
import { receiveNewMessage } from "../features/chat/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/styles";
import {
  selectConversation,
  selectConversationLatestStatus,
} from "../features/chat/conversationSlice";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportModal from "./chat/rightBar/components/ReportModal";
import { axiosClient } from "../setup/axiosClient";
import { confirm } from "react-confirm-box";

export default function Homepage() {
  const conversation = useSelector(selectConversation);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openRightBar, setOpenRightBar] = React.useState(
    isMobile ? false : true
  );
  const [openMbLeftBar, setOpenMbLeftBar] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = useState(false);
  const conversationLatestStatus = useSelector((state) => {
    return selectConversationLatestStatus(state, conversation?.id);
  });
  const [reportModal, setReportModal] = React.useState(false);

  const renderRightBarBox = () => {
    if (!conversation?.partner) return <></>;
    return <RightBar />;
  };

  useEffect(() => {
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
  const handleCloseConversationSetting = () => {
    setAnchorElNav(null);
  };
  const handleOpenConversationSetting = (event) => {
    setAnchorElNav(event.currentTarget);
  };
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
  function reportUser() {
    setReportModal(true);
  }
  const endConversation = async () =>{
    const result = await confirm("Are you sure? After end chat, you both can not chat and see each other information");
    if (result) {
      axiosClient.put(`/conversations/${conversation.id}/close`)
    }
  }
  const menuList = [
    {
      name: "Report Partner",
      action: () => reportUser(),
    },
    {
      name: "End Conversation",
      action: () => endConversation(),
    },
  ];
  return (
    <>
      {/* <Box w={100} sx={{ borderBottom: ".3px solid #e0e0e0" }}></Box> */}
      <Box
        sx={{
          display: "flex",
          height: "100%",
          position: "relative",
          // borderTop: "1px solid #e5e0e0",
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
            borderRight: "1px solid #ebebeb",
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
              top: "2.5px",
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
            bgcolor: "#fff",
            zIndex: 10,
          }}
        >
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
              xs={openRightBar && !isMobile && conversation?.partner ? 8.5 : 12}
              sx={{
                height: "100%",
                transition: "all 0.25s ease",
              }}
            >
              <MessageLayout openBar={handleOpenRightBar} />
            </Grid>
            <Grid
              id="msg-right-bar-lt"
              item
              xs={openRightBar && !isMobile && conversation?.partner ? 3.5 : 0}
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
                borderLeft: "1px solid #e0e0e0",
                zIndex: 20,
                background: "#fff",
              }}
            >
              <Stack
                flexDirection="row"
                justifyContent="flex-end"
                sx={{
                  width: "100%",
                  position: "absolute",
                  top: isMobile ? 12 : 0,
                  right: isMobile ? 12 : 0,
                  zIndex: 13,
                }}
              >
                <Box>
                  <Tooltip title="Coversation Setting">
                    <IconButton
                      onClick={handleOpenConversationSetting}
                      disableRipple
                    >
                      {isMobile === true ? (
                        <MoreHorizIcon
                          sx={{
                            width: "30px",
                            height: "30px",
                            color:
                              (conversationLatestStatus ||
                                conversation?.status) === "sharing"
                                ? "#776d99"
                                : "#fff",
                          }}
                        />
                      ) : (
                        <MoreVertIcon
                          sx={{
                            width: "30px",
                            height: "30px",
                            color:
                              (conversationLatestStatus ||
                                conversation?.status) === "sharing"
                                ? "#776d99"
                                : "#fff",
                          }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    elevation={3}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseConversationSetting}
                  >
                    {menuList.map((menu, index) =>
                      menu.name === "New Post" ? (
                        <div key={index}></div>
                      ) : (
                        <MenuItem key={index} onClick={menu.action}>
                          <Typography
                            key={index}
                            // component={Link}
                            // to={menu.link}
                            textAlign="center"
                            color="#000"
                            fontSize="14px"
                          >
                            {menu.name}
                          </Typography>
                        </MenuItem>
                      )
                    )}
                  </Menu>
                </Box>
                <IconButton
                  onClick={closeRightBar}
                  sx={{ display: isMobile ? "" : "none" }}
                  disableRipple
                >
                  <CloseIcon
                    sx={{
                      color:
                        (conversationLatestStatus || conversation?.status) ===
                        "sharing"
                          ? "#776d99"
                          : "#fff",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </IconButton>
              </Stack>
              {renderRightBarBox()}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ReportModal
        onClose={() => setReportModal(false)}
        open={reportModal}
        data={conversation?.partner}
      ></ReportModal>
    </>
  );
}
