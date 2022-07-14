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
      </>
    );
  }
}
