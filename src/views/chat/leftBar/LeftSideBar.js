import {
  Avatar,
  Card,
  CardHeader,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";
import React from "react";
import DrawerSideBar from "../../common/drawer/DrawerSideBar";
import { DRAWER_WITH } from "../../../constant/css_constant";
import { RandomChatSideBarItem } from "../../../constant/RandomChatSideBarItem";
import ConversationHistory from "./conversationHistory/ConversationHistory";
import ConversationControlBox from "../topBar/startConversation/ConversationControlBox";

export default function LeftSideBar(props) {
  return (
    <>
      <ConversationHistory />
      {/* <Box width={DRAWER_WITH} sx={{position: "absolute", bottom : 20, left: '50%', transform: "translateX(-50%)", zIndex:9999}}>
        <ConversationControlBox />
      </Box> */}
    </>
  );
}
