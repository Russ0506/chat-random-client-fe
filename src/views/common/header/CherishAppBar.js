import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Stack, styled, useMediaQuery, useTheme } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { APP_BAR_HEIGHT} from "../../../constant/css_constant";
import { Link } from "react-router-dom";
import { icoList } from "../../../constant/AppBarConstant";
import CBCLogo from "../../../assets/img/cbc_logo_sm.png";
import CBCTitle from "../../../assets/img/cbc_title.png";
import Iconify from "../base/icon/Iconify";
import { useSelector } from "react-redux";
import TipsGuide from "../tipsGuide/TipsGuide";
import NewPosterLayout from "../../profile/components/NewPosterLayout";
import { useDispatch } from "../../../store/store";
import {
  resetIdsOfUnreadCon,
  setIdsOfUnreadCon,
  setlistConversation,
} from "../../../features/chat/conversationSlice";
import { axiosClient } from "../../../setup/axiosClient";
import ConversationControlBox from "../../chat/topBar/startConversation/ConversationControlBox";
const settings = [
  {
    name: "Profile",
    linkUrl: `/users/profile/${localStorage.getItem("user_id")}`,
  },
  {
    name: "Edit profile",
    linkUrl: "/users/profile/edit",
  },
  {
    name: "Tips & guide",
  },
  { name: "Logout", linkUrl: "/users/logout" },
];
const CherishAppBar = ({ index = 1 }) => {
  const currentUId = localStorage.getItem("user_id");
  const idsOfUnreadCon = useSelector(
    (state) => state.conversation.idsOfUnreadCon
  );
  const listConversation = useSelector(
    (state) => state.conversation.listConversation
  );
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [useNewPost, setUseNewPost] = React.useState(false);
  const [openTips, setOpenTips] = React.useState(false);
  const theme= useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  function handleOpenNewPost() {
    setUseNewPost(true);
  }
  function handleCloseNewPost() {
    setUseNewPost(false);
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  React.useEffect(() => {
    if (listConversation.length <= 0) {
      dispatch(resetIdsOfUnreadCon);
      let unreadIds = [];
      axiosClient.get(`conversations`).then(async (data) => {
        if (data) {
          await data.forEach((element, index) => {
            if (
              element["last_message"]["status"] !== "seen" &&
              element["last_message"]["recipient_id"] == currentUId
            ) {
              unreadIds.push(element.id);
            }
          });
        }

        dispatch(setlistConversation(data));
        dispatch(setIdsOfUnreadCon(unreadIds));
      });
    }
  }, []);

  return (
    <AppBar
      position="static"
      component={Box}
      sx={{
        height: APP_BAR_HEIGHT,
        background: "#fff",
        // boxShadow: "none",
        // border: "1px solid #e5e0e0",
        boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
        borderLeft: 0,
        borderTop: 0,
      }}
    >
      <Container
        sx={{
          width: "100%",
          maxWidth: "100% !important",
          height: "100%",
          pl: "8px !important",
          pr: "8px !important",
        }}
      >
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <Box
            sx={{
              flexGrow: 1,
              height: "100%",
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <MenuIcon
              sx={{
                p: 0,
                width: "30px",
                height: "30px",
                color: "#817cce",
                cursor: "pointer",
                display: { xs: "flex", md: "none" },
              }}
              onClick={handleOpenNavMenu}
            /> */}
            <Box
              component={Link}
              to="/homepage"
              height="100%"
              sx={{ display: "flex", padding: "10px", alignItems: "flex-end" }}
            >
              <img
                src={CBCLogo}
                alt=""
                height="100%"
                // style={{ padding: "16px" }}
              ></img>
              <img
                src={CBCTitle}
                alt=""
                style={{
                  height: "calc(100% / 2.5)",
                  marginLeft: "5px",
                  display: isMobile ? "none" : "block",
                }}
              ></img>
            </Box>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {icoMenuList.map((menu, index) =>
                menu.name === "New Post" ? (
                  <div key={index}></div>
                ) : (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={menu.link}
                      textAlign="center"
                      color="#000"
                    >
                      {menu.name}
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu> */}
          </Box>
          {/* <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          ></Box> */}
          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: isMobile ? 1 : 0, height: "100%" }}
          >
            {/* <Stack
              display={{ xs: "none", md: "flex" }}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 0,
                p: sidePadding + "px",
                borderRight: "1px solid #e5e0e0",
                background: "#fff",
              }}
            > */}
            <Box height="100%" display="flex">
              {index === 1 ? (
                <ChosenButtonNav component={Link} to={icoList.home.link}>
                  <Iconify
                    icon={icoList.home.chosen}
                    style={{ width: "31px", height: "31px" }}
                  />
                </ChosenButtonNav>
              ) : (
                <ButtonNav component={Link} to={icoList.home.link}>
                  <Iconify
                    icon={icoList.home.notChosen}
                    style={{ width: "31px", height: "31px" }}
                  />
                </ButtonNav>
              )}
              {index === 2 ? (
                <ChosenButtonNav component={Link} to={icoList.chat.link}>
                  <Badge color="secondary" badgeContent={idsOfUnreadCon.length}>
                    <Iconify
                      icon={icoList.chat.chosen}
                      style={{ width: "25px", height: "25px" }}
                    />
                  </Badge>
                </ChosenButtonNav>
              ) : (
                <ButtonNav component={Link} to={icoList.chat.link}>
                  <Badge color="secondary" badgeContent={idsOfUnreadCon.length}>
                    <Iconify
                      icon={icoList.chat.notChosen}
                      style={{ width: "25px", height: "25px" }}
                    />
                  </Badge>
                </ButtonNav>
              )}
              <ButtonNav>
                <ConversationControlBox isNav={true} />
              </ButtonNav>
              <ButtonNav>
                <Badge color="secondary">
                  <NotificationsNoneIcon
                    sx={{ width: "28px", height: "28px" }}
                  />
                </Badge>
              </ButtonNav>
            </Box>
            <Box
            sx={{
              flexGrow: 1,
              display:  isMobile ? "flex" :"none",
              justifyContent: "flex-end",
            }}
          ></Box>
            {/* </Stack> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} size="small">
                <Avatar
                  alt="Memy Sharp"
                  src={localStorage.getItem("avatar_path")}
                  sx={{
                    p: 0,
                    background: "#817cce",
                    backgroundColor: "#817cce",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={handleCloseUserMenu}
                  sx={{ pl: 0, pr: 0 }}
                >
                  {setting.name === "Tips & guide" ? (
                    <Typography
                      component={Link}
                      variant="body1"
                      textAlign="left"
                      sx={{
                        color: "black",
                        textDecoration: "none",
                        width: "100%",
                        pl: 2,
                        pr: 2,
                      }}
                      to={setting.linkUrl == null ? "" : setting.linkUrl}
                      onClick={() => {
                        setOpenTips(true);
                      }}
                    >
                      {setting.name}
                    </Typography>
                  ) : (
                    <Typography
                      component={Link}
                      variant="body1"
                      textAlign="left"
                      sx={{
                        color: "black",
                        textDecoration: "none",
                        width: "100%",
                        pl: 2,
                        pr: 2,
                      }}
                      to={setting.linkUrl == null ? "" : setting.linkUrl}
                    >
                      {setting.name}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
      {openTips ? <TipsGuide onClose={() => setOpenTips(false)} /> : <></>}
      {useNewPost === true ? (
        <NewPosterLayout open={true} onClose={handleCloseNewPost} />
      ) : (
        ""
      )}
    </AppBar>
  );
};
export default CherishAppBar;
const navBtnCmm = {
  borderRadius: "0px",
  width: "auto",
  height: "100%",
  margin: "0px 12px 0px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const ButtonNav = styled(Stack)(({ theme }) => ({
  color: "#9da8b7",
  ...navBtnCmm,
  "&:active": {
    color: "#6748da",
  },
  "&:hover": {
    color: "#6748da",
  },
}));

const ChosenButtonNav = styled(Stack)(({ theme }) => ({
  // backgroundColor: "#ececfa",
  color: "#6748da",
  ...navBtnCmm,
  borderBottom: "3px solid #6748da",
  "&:active": {
    color: "#6748da",
  },
  "&:hover": {
    color: "#6748da",
  },
}));
