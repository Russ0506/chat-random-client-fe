import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../setup/axiosClient'

export const sendNewMessage = createAsyncThunk(
  "chat/send-new-message",
  async (params, thunkAPI) => {
    try {
      const response = await axiosClient.post(`/conversations/${params.conversationId}/messages`, {
        text: params.text,
        recipient_id: params.recipient_id,
      })
      return params
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  newMessages: [],
  status: 'idle'
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    receiveNewMessage: (state, { payload }) => {
      state.newMessages.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNewMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendNewMessage.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        console.log(payload)
        state.newMessages.push(payload);
      });
  }
});

export const { receiveNewMessage } = messagesSlice.actions;

export const selectNewMessages = (state) => {
  return state.messages.newMessages;
}

export default messagesSlice.reducer;
