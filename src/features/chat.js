import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ChatService from "../service/chat.service";

export const enqueuingChat = createAsyncThunk(
  "chat/enqueuing",
  async (params, thunkAPI) => {
    try {
        const response = await ChatService.enqueuingChat();
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
        // thunkAPI.dispatch(setMessage(error.toString()));
        return thunkAPI.rejectWithValue();
      }
  }
);

export const loadConversation = createAsyncThunk(
  "chat/loading-conversation",
  async (params, thunkAPI) => {
    try {
        const response = await ChatService.loadConversation(params);
        console.log(response);
        // thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
        // thunkAPI.dispatch(setMessage(error.toString()));
        return thunkAPI.rejectWithValue();
      }
  }
);

const initialState = {}
const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: {
  },
});
const { reducer } = chatSlice;
export default reducer;
