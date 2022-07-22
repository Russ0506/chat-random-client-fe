import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ConversationControlBox from "../../chat/topBar/startConversation/ConversationControlBox";
import { Badge } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { APP_BAR_HEIGHT } from "../../../constant/css_constant";
import { Link, useLocation } from "react-router-dom";
import { ThemeConsumer } from "styled-components";
import { cilBorderTop } from "@coreui/icons";
import { icoMenuList } from "../../../constant/AppBarConstant";
import Iconify from "../base/icon/Iconify";
const settings = [
  {
    name: "Profile",
    linkUrl: "/users/profile",
  },
  {
    name: "Account",
    linkUrl: "/users/profile/edit",
  },
  { name: "Logout", linkUrl: "/users/logout" },
];

const CherishAppBar = () => {
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

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
      <Container sx={{ width: "100%", maxWidth: "100% !important" }}>
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex", color: "#817cce" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <MenuIcon
              sx={{
                p: 0,
                width: "30px",
                height: "30px",
                color: "#817cce",
                cursor: "pointer",
              }}
              onClick={handleOpenNavMenu}
            />
            <Menu
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
              {icoMenuList.map(
                (menu, index) =>
                  (menu.name === "New Post" ? (
                    <></>
                  ) : (
                    <MenuItem key={menu.name} onClick={handleCloseNavMenu}>
                      <Typography
                        component={Link}
                        to={menu.link}
                        textAlign="center"
                        color="#000"
                      >
                        {menu.name}
                      </Typography>
                    </MenuItem>
                  ))
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          ></Box>
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt="Memy Sharp"
                  src="#"
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
                <MenuItem key={i} onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    variant="body1"
                    textAlign="center"
                    sx={{ color: "black", textDecoration: "none" }}
                    to={setting.linkUrl == null ? "" : setting.linkUrl}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <IconButton aria-label={notificationsLabel(100)}>
            <Badge badgeContent={100} color="secondary">
              <NotificationsNoneIcon sx={{ width: "30px", height: "30px" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default CherishAppBar;
