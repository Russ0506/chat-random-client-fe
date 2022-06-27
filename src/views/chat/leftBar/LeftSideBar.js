import {
  Avatar,
  Card,
  CardHeader,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import React from "react";
import DrawerSideBar from "../../common/drawer/DrawerSideBar";
import { DRAWER_WITH } from "../../../constant/css_constant";
import { RandomChatSideBarItem } from "../../../constant/RandomChatSideBarItem";
import ConversationHistory from "./conversationHistory/ConversationHistory";

export default function LeftSideBar(props) {
  return (
    <Box>
      {/* <TopSideBar/>
      <SearchChatBoxLayer />
      <GroupChatSideBar />
      <ChatSideBar /> */}

      {/* <DrawerSideBar /> */}
      <ConversationHistory />
    </Box>
  );
}
