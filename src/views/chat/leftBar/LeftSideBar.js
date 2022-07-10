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
          padding={{xs: 1}}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="flex-start"
          paddingBottom={2.8}
        >
          <ConversationControlBox />
        </Stack>
      </>
    );
  }
}
