import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth";
import messageReducer from "../features/message";
import conversationReducer from "../features/conversations/conversationSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  conversation: conversationReducer
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;
