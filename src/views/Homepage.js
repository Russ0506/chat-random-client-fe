import { CssBaseline, Grid, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { DRAWER_WITH } from "../constant/css_constant";
import LeftSideBar from "./chat/leftBar/LeftSideBar";
import RightBar from "./chat/rightBar/RightBar";
import TopBar from "./chat/topBar/TopBar";
import MessageLayout from "./chat/areaChat/MessageLayout";
import { AppearanceSocket, PairingSocket } from "./sockets/Socket";
import React from "react";
import CherishAppBar from "./common/header/CherishAppBar";

export default function Homepage() {
  const [openRightBar, setOpenRightBar] = React.useState(true);
  const handleOpenRightBar = () => {
    setOpenRightBar(openRightBar ? false : true);
  };
  return (
    <>
      <CherishAppBar />
      <AppearanceSocket />
      <PairingSocket />
      <Box w={100} sx={{ borderBottom: ".3px solid #e0e0e0" }}></Box>
      <Box sx={{ display: "flex", height: "calc(100vh - 69px)" }} className="v11">
        {/* <AppearanceSocket/> */}
        {/* <PairingSocket/> */}
        <CssBaseline />
        {/* <TopBar /> */}
        <Box
          // component="nav"
          sx={{
            width: { sm: DRAWER_WITH },
            flexShrink: { sm: 0 },
            height: "100%",
            position: "relative",
          }}
        >
          <LeftSideBar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            // p: 2,
            width: { sm: `calc(100% - ${DRAWER_WITH}px)` },
            bgcolor: "white",
          }}
        >
          {/* <Toolbar /> */}
          <Grid
            container
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ height: "100%" }}
          >
            <Grid
              item
              xs={openRightBar === true ? 8.5 : 12}
              sx={{
                borderRight: "1px solid #e0e0e0",
                height: "100%",
                // paddingBottom: "25px",
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
                // boxShadow: "-5px 0px 10px 0px rgb(99 99 99 / 40%)",
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

Homepage.propTypes = {
  window: PropTypes.func,
};
