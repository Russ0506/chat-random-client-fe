import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import messageReducer from "../features/message";
import conversationReducer from "../features/chat/conversationSlice";
import messagesReducer from "../features/chat/messagesSlice";

const reducer = {
  auth: authReducer, // store for authen
  message: messageReducer, // store message response from api
  conversation: conversationReducer, // store infor of current conversation
  messages: messagesReducer, // store list message for currrent conversation
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
