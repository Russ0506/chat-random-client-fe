import { CssBaseline, Grid, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { DRAWER_WITH } from "../constant/css_constant";
import LeftSideBar from "./chat/leftBar/LeftSideBar";
import RightBar from "./chat/rightBar/RightBar";
import TopBar from "./chat/topBar/TopBar";
import MessageLayout from "./chat/areaChat/MessageLayout"
import {AppearanceSocket, PairingSocket} from './sockets/Socket'

export default function Homepage() {
  return (
    <Box>
      <AppearanceSocket />
      <PairingSocket />
      <TopBar />
      <Box w={100} sx={{ borderBottom: "1px solid #e0e0e0" }}></Box>
      <Box sx={{ display: "flex", height: "100vh" }} className="v11">
        {/* <AppearanceSocket/> */}
        {/* <PairingSocket/> */}
        <CssBaseline />
        {/* <TopBar /> */}
        {/* <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WITH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <LeftSideBar />
      </Box> */}
        <Box
          component="nav"
          sx={{ width: { sm: DRAWER_WITH }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <LeftSideBar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
            bgcolor: "white",
          }}
        >
          <Toolbar />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{height: '100%'}}
          >
            <Grid
              item
              xs={8}
              sx={{ borderRight: "1px solid #e0e0e0", height: "100%", paddingBottom: "25px" }}
            >
              <MessageLayout />
            </Grid>
            <Grid item xs={4}>
              <RightBar />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

Homepage.propTypes = {
  window: PropTypes.func,
};