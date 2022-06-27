import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { RandomChatSideBarItem } from "../../../../constant/RandomChatSideBarItem";
import ChatInfoLayer from "../components/ChatInfoLayer";
import FilterChatBoxLayer from "../components/FilterChatBoxLayer";
import TopSideBar from "../components/TopSideBar";
import { DRAWER_WITH } from "../../../../constant/css_constant";
import {allConversationHistory} from "../../../../constant/conversasionHistory";
export default function ConversationHistory() {
  const useStyles = makeStyles({
    drawerPaper: {
      marginTop: "64px",
      paddingTop: "0px",
    },
  });

  const classes = useStyles();

  const drawer = (
    <Box>
      {/* <Toolbar /> */}

      {/* {RandomChatSideBarItem.map((component, i) => ( */}
        {/* <ListItem>
            {
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {component.name}
              </Typography>
            }
          </ListItem> */}
        <List>
          {allConversationHistory.map((item, k) => (
            <ListItem key={k} disablePadding>
              <ListItemButton>
                <ChatInfoLayer data={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      {/* ))} */}
    </Box>
  );

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WITH,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
    /* <h1>group chat layer</h1>
      <ChatInfoLayer />
      <FilterChatBoxLayer /> */
  );
}
