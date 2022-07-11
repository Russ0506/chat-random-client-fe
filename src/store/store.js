import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import messageReducer from "../features/message";
import conversationReducer from "../features/chat/conversationSlice";
import messagesReducer from "../features/chat/messagesSlice";
import onlineStatusesReducer from "../features/chat/onlineStatusesSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  conversation: conversationReducer,
  messages: messagesReducer,
  onlineStatuses: onlineStatusesReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
