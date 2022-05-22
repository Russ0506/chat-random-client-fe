import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth";
import messageReducer from "../features/message";
const reducer = {
  auth: authReducer,
  message: messageReducer
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;