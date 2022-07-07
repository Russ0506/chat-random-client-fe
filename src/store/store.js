import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth";
import messageReducer from "../features/message";
import conversationReducer from "../features/chat/conversationSlice";
import messagesReducer from "../features/chat/messagesSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  conversation: conversationReducer,
  messages: messagesReducer
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;
