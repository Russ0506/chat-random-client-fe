import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DRAWER_WITH, GRP_COLOR } from "../../constant/css_constant";
import MessageLayout from "../pages/chat/components/areaChat/MessageLayout";
import LeftSideBar from "../pages/chat/components/leftBar/LeftSideBar";
import TopBar from "../pages/chat/components/topBar/TopBar";
import { ThemeProvider } from "styled-components";
import { createTheme, Grid } from "@mui/material";
import RightBar from "../pages/chat/components/rightBar/RightBar";
import AppearanceSocket from '../sockets/AppearanceSocket'
import PairingSocket from '../sockets/PairingSocket'

export default function UserHomepage() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }} >
      <AppearanceSocket/>
      <PairingSocket/>
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
        component="chat"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
          bgcolor: "white"
        }}
      >
        <Toolbar />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8} sx={{ borderRight: "1px solid #e0e0e0", height: "100rem"}}>
            <MessageLayout />
          </Grid>
          <Grid item xs={4}>
            <RightBar />
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}

UserHomepage.propTypes = {
  window: PropTypes.func,
};
