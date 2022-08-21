import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient, axiosMultipartForm } from '../../setup/axiosClient'
import { v4 as uuidv4 } from 'uuid';

function wait() {
  return new Promise((resolve) =>
    setTimeout(()=> resolve(), 500)
  );
}

export const sendNewMessage = createAsyncThunk(
  "chat/send-new-message",
  async (params, thunkAPI) => {
    try {
      await wait();
      if(params.attachment) {
        const response = await axiosMultipartForm.post(`/conversations/${params.conversationId}/messages`, params)
      } else {
        const response = await axiosClient.post(`/conversations/${params.conversationId}/messages`, params)
      }
      return params
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  newMessages: [],
  latestStatuses: {},
  latestMessages: {},
  status: 'idle'
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    receiveNewMessage: (state, { payload }) => {
      if (payload.in_current_conversation) {
        state.newMessages.push(payload.message);
      }
      state.latestMessages[payload.message.conversation_id] = payload.message;
    },
    updateLatestStatuses: (state, { payload }) => {
      if (payload?.id) state.latestStatuses[payload.id] = payload.status;
      if (payload?.uuid) state.latestStatuses[payload.uuid] = payload.status;
    },
    seenLastMessage: (state, { payload }) => {
      let message =  state.latestMessages[payload.conversationId] || payload.preloadMessage
      if (message?.id) state.latestStatuses[message.id] = 'seen';
      if (message?.uuid) state.latestStatuses[message.uuid] = 'seen';
    },
    resetMessages: (state) => {
      state.newMessages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNewMessage.pending, (state, action) => {
        state.status = 'loading';
        action.meta.arg.uuid = uuidv4();
        let message = action.meta.arg;
        message.status = 'sending'
        state.newMessages.push(message);
        state.latestMessages[message.conversationId] = message;
      })
      .addCase(sendNewMessage.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        if (!state.latestStatuses[payload.uuid]) {
          state.latestStatuses[payload.uuid] = 'sent'
        }
      });
  }
});

export const { receiveNewMessage, updateLatestStatuses, seenLastMessage, resetMessages } = messagesSlice.actions;

export const selectNewMessages = (state) => {
  return state.messages.newMessages;
}

export const selectMsgLatestStatus = (state, message) => {
  if (!message) return undefined
  if (message.id) {
    return state.messages.latestStatuses[message.id];
  } else {
    return state.messages.latestStatuses[message.uuid];
  }
}

export const selectLatestMessage = (state, conversationId) => {
  if (conversationId) {
    return state.messages.latestMessages[conversationId];
  } else {
    return state.messages.latestMessages[conversationId];
  }
}

export default messagesSlice.reducer;
