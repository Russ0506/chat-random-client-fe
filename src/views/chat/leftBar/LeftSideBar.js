import { Stack } from "@mui/material";
import React from "react";
import { DRAWER_WITH } from "../../../constant/css_constant";
import ConversationsList from "./components/ConversationsList";
import ConversationControlBox from "../topBar/startConversation/ConversationControlBox";

export default class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ConversationsList />
        <Stack
          width={DRAWER_WITH}
          height="70px"
          alignItems="center"
          justifyContent="flex-end"
          paddingBottom={2.8}
        >
          <ConversationControlBox />
        </Stack>
      </>
    );
  }
}
