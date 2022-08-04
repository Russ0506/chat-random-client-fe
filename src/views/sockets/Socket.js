import store from '../../store/store'
import { updateLatestStatuses, receiveNewMessage } from "../../features/chat/messagesSlice";
import {
  seenConversation, touchConversation, createNewConversation,
  updateConversationLatestStatus,
  updateIdsOfUnreadCon
} from "../../features/chat/conversationSlice";
import { partnerGoOnline, partnerGoOffline } from "../../features/chat/onlineStatusesSlice";

function Socket(props) {
  const ActionCable = require('actioncable');
  Socket.cable = ActionCable.createConsumer(`${process.env.REACT_APP_SOCKET_URL}?jwt_token=${localStorage.getItem('jwt_token')}`);
  Socket.cable.subscriptions.create(props, {
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
      store.dispatch(updateIdsOfUnreadCon(data))
      props.received(data);
    }
  })
}

function appearanceSocket() {
  Socket({
    channel: "AppearanceChannel",
    connected: () => { },
    disconnected: () => { },
    received: () => { }
  })
}

function onlineStatusSocket(userId) {
  Socket({
    channel: "OnlineStatusChannel",
    user_id: userId,
    connected: () => { },
    disconnected: () => { },
    received: (data) => {
      if (data.is_online) {
        store.dispatch(partnerGoOnline(data))
      } else {
        store.dispatch(partnerGoOffline(data))
      }
    }
  })
}

function pairingSocket() {
  Socket({
    channel: "PairingChannel",
    connected: () => { },
    disconnected: () => { },
    received: (data) => {
      store.dispatch(createNewConversation(data));
    }
  })
}

function newMessageSocket(props) {
  Socket({
    channel: "NewMessageChannel",
    connected: () => { },
    disconnected: () => { },
    received: (message) => {
      const is_in_current_conversation = store.getState().conversation?.currentConversation?.id == message.conversation_id;
      store.dispatch(receiveNewMessage({ message: message, in_current_conversation: is_in_current_conversation }));
      store.dispatch(touchConversation({ conversationId: message.conversation_id }));
      if (is_in_current_conversation) {
        store.dispatch(seenConversation({ conversationId: message.conversation_id }));
        store.dispatch(updateLatestStatuses(message));
      }
    }
  })
}

function msgLatestStatusSocket(props) {
  Socket({
    channel: "MsgLatestStatusChannel",
    connected: () => { },
    disconnected: () => { },
    received: (data) => {
      store.dispatch(updateLatestStatuses(data.message))
    }
  })
}

function conversationStatusSocket(props) {
  Socket({
    channel: "ConversationStatusChannel",
    connected: () => { },
    disconnected: () => { },
    received: (data) => {
      store.dispatch(updateConversationLatestStatus(data));
    }
  })
}

export {
  pairingSocket, appearanceSocket, onlineStatusSocket,
  newMessageSocket, msgLatestStatusSocket, conversationStatusSocket
};
