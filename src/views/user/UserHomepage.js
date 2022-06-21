import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DRAWER_WITH } from "../../constant/css_constant";
import LeftSideBar from "../pages/chat/components/leftBar/LeftSideBar";
import MessageLayout from "../pages/chat/components/message/MessageLayout";
import TopBar from "../pages/chat/components/topBar/TopBar";

export default function UserHomepage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar />
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WITH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <LeftSideBar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
        }}
      >
        <Toolbar />
        <MessageLayout />
      </Box>
    </Box>
  );
}

UserHomepage.propTypes = {
  window: PropTypes.func,
};