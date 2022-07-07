import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ChatMessageInput from "./sendMessageBox/ChatMessageInput";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatMessageList from "./message/ChatMessageList";
import ChatHeaderDetail from "./title-chat/ChatHeaderDetail";
import moment from "moment";

export default class MessageLayout extends React.Component {
  constructor(props){
    super(props);
    this.newMessage = props.newMessage;
    this.openBar = props.openBar;
    this.conversation = props.conversation;
    this.partner = props.conversation.partner;
    this.state = {
      newMessages: []
    };
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    if (this.newMessage != undefined) {
      this.handleSendMessage(this.newMessage);
    }
  }

  handleSendMessage = async (message) => {
    this.setState({
      newMessages : [
        ...this.newMessages, {
          id: message.id ? message.id : 0,
          conversation_id: message.conversationId,
          sender_id: null,
          recipient_id: message.recipient_id,
          text: message.text,
          created_at: moment().format(),
          status: null,
          is_system_message: false,
        },
      ]
    });
    var element = document.getElementById("chat-scroll-ult");
    element.scrollTop = element.scrollHeight;
  };

  render (){
    return (
      <Box sx={{ width: "100%", height: "100%", padding: "0px" }}>
        <Box
          sx={{ height: "calc(100% - 70px)", width: "100%", pl: 2, pt: 0 }}
        >
          <ChatHeaderDetail
            partner={this.partner}
            openBar={this.openBar}
          />
          <ChatMessageList
            newMessages={this.newMessages}
            // conversation={this.conversation}
          />
        </Box>
        {/* <Divider /> */}
        <Box sx={{ height: "60px", padding: "0px", paddingBottom: "10px" }}>
          <ChatMessageInput
            disabled={false}
            conversation={this.conversation}
            onSend={this.handleSendMessage}
          />
        </Box>
      </Box>
    );
  }
}
