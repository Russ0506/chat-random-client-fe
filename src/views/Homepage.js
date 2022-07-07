import { CssBaseline, Grid, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { APP_BAR_HEIGHT, DRAWER_WITH } from "../constant/css_constant";
import LeftSideBar from "./chat/leftBar/LeftSideBar";
import RightBar from "./chat/rightBar/RightBar";
import TopBar from "./chat/topBar/TopBar";
import MessageLayout from "./chat/areaChat/MessageLayout";
import { pairingSocket, appearanceSocket, newMessageSocket } from "./sockets/Socket";
import React from "react";

const newMessagesRoot = document.getElementById('new_messages');

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRightBar: true,
      conversation: {id: 5, partner_id: 42},
      newMessageIds: [],
      newMessage: undefined,
    };
    this.newMessageDiv = document.createElement('div');
  }

  received (data) {
    this.setState({newMessage: data})
  }

  componentDidMount(){
    if (localStorage.getItem('user_id') == 42) {
      this.setState({conversation: {id: 5, partner_id: 21}})
    }
    newMessageSocket({
      received: this.received.bind(this)
    });
    pairingSocket();
    appearanceSocket();
  }

  handleOpenRightBar = () => {
    this.setState({
      openRightBar:  !this.state.openRightBar
    });
  };

  rerenderMessageLayout = (data) => {
    this.setState({
      newMessage : data
    })
  }

  render() {
    return (
      <>
        {/* <Box w={100} sx={{ borderBottom: ".3px solid #e0e0e0" }}></Box> */}
        <Box
          sx={{ display: "flex", height: '100%' }}
          className="v11"
        >
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
                xs={this.state.openRightBar === true ? 8.5 : 12}
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  height: "100%",
                }}
              >
                <MessageLayout
                  openBar={this.handleOpenRightBar}
                  conversation={this.state.conversation}
                  newMessage={this.state.newMessage}
                />
              </Grid>
              <Grid
                id="msg-right-bar-lt"
                item
                xs={this.state.openRightBar === true ? 3.5 : 0}
                sx={{
                  transition: "all 0.2s ease",
                  display: this.state.openRightBar === true ? "" : "none",
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
}
