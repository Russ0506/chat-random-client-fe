import store from '../../store/store'
import { updateLatestStatuses, receiveNewMessage } from "../../features/chat/messagesSlice";
import { seenConversation } from "../../features/chat/conversationSlice";

function Socket(props) {
  const ActionCable = require('actioncable');
  Socket.cable = ActionCable.createConsumer(`${process.env.REACT_APP_SOCKET_URL}?jwt_token=${localStorage.getItem('jwt_token')}`);
  Socket.cable.subscriptions.create(props , {
    connected() {
      console.log("Connected to the channel:", this);
      props.connected();
    },
    disconnected() {
      console.log("Disconnected");
      props.disconnected();
    },
    received(data) {
      console.log("Received some data:", data);
      props.received(data);
    }
  })
}

function appearanceSocket(){
  Socket({
    channel: "AppearanceChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: ()=>{}
  })
}

function pairingSocket(){
  Socket({
    channel: "PairingChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: ()=>{}
  })
}

function newMessageSocket(props){
  Socket({
    channel: "NewMessageChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: (message)=>{
      if (store.getState().conversation?.currentConversation?.id == message.conversation_id){
        store.dispatch(receiveNewMessage(message));
        store.dispatch(seenConversation({conversation_id: message.conversation_id}));
      }
    }
  })
}

function msgLatestStatusSocket(props){
  Socket({
    channel: "MsgLatestStatusChannel",
    connected: ()=>{},
    disconnected: ()=>{},
    received: (data)=>{
      store.dispatch(updateLatestStatuses(data.message))
    }
  })
}

export { pairingSocket, appearanceSocket, newMessageSocket, msgLatestStatusSocket };
