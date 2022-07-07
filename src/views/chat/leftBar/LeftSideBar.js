import React from "react";
import ConversationsList from "./components/ConversationsList";
// pairingSocket();

export default class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChangedConversation = props.onChangedConversation;
  }

  render() {
    return (
      <>
        <ConversationsList onChangedConversation={this.onChangedConversation} />
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
