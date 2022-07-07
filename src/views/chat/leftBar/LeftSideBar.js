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
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { DRAWER_WITH } from "../../../constant/css_constant";
import ConversationHistory from "./conversationHistory/ConversationHistory";
import ConversationControlBox from "../topBar/startConversation/ConversationControlBox";

export default function LeftSideBar(props) {
  return (
    <>
      <ConversationHistory />
      <Stack
        width={DRAWER_WITH}
        height="70px"
        alignItems="center"
        justifyContent="center"
      >
        <ConversationControlBox />
      </Stack>
    </>
  );
}
