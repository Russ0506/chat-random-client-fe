import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import messageReducer from "../features/message";
import conversationReducer from "../features/chat/conversationSlice";
import messagesReducer from "../features/chat/messagesSlice";
import onlineStatusesReducer from "../features/chat/onlineStatusesSlice";
import postReducer from "../features/chat/postSlice";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  conversation: conversationReducer,
  messages: messagesReducer,
  onlineStatuses: onlineStatusesReducer,
  post: postReducer,
};
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
