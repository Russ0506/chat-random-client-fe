import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../setup/axiosClient'

export const seenConversation = createAsyncThunk(
  "chat/seen_all_messages_in_conversation",
  async (params, thunkAPI) => {
    try {
      await axiosClient.put(`/conversations/${params.conversationId}/seen`)
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  currentConversation : null,
  recentConversationIds : [],
  newConversations: []
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    changeConversation: (state , { payload }) => {
      state.currentConversation = payload
    },
    touchConversation: (state, { payload }) => {
      state.recentConversationIds.push(payload.conversationId);
    },
    createNewConversation: (state, { payload }) => {
      state.newConversations.push(payload)
    }
  }
});

export const { changeConversation, touchConversation, createNewConversation } = conversationSlice.actions;

export const selectConversation = (state) => {
  return state.conversation.currentConversation;
}

export const selectMostRecentConversationId = (state) => {
  const ids = state.conversation.recentConversationIds
  return ids[ids.length - 1];
}

export const selectNewestConversations =  (state)  => {
  if (state.conversation.newConversations) {
    return state.conversation.newConversations[state.conversation.newConversations.length - 1];
  } else {
    return null;
  }
}

export default conversationSlice.reducer;
