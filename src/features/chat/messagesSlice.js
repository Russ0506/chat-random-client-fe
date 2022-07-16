import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../setup/axiosClient'
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
      const response = await axiosClient.post(`/conversations/${params.conversationId}/messages`, {
        text: params.text,
        recipient_id: params.recipient_id,
        uuid: params.uuid
      })
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
      state.latestStatuses[payload.id] = payload.status;
      state.latestStatuses[payload.uuid] = payload.status;
    },
    seenLastMessage: (state, { payload }) => {
      if (state.latestMessages[payload.conversationId]) {
        state.latestMessages[payload.conversationId].status = 'seen';
      }
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
        state.latestStatuses[payload.uuid] = 'sent'
      });
  }
});

export const { receiveNewMessage, updateLatestStatuses, seenLastMessage, resetMessages } = messagesSlice.actions;

export const selectNewMessages = (state) => {
  return state.messages.newMessages;
}

export const selectMsgLatestStatus = (state, message) => {
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
