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
    }
  }
});

export const { changeConversation, touchConversation } = conversationSlice.actions;

export const selectConversation = (state) => {
  return state.conversation.currentConversation;
}

export const selectMostRecentConversationId = (state) => {
  const ids = state.conversation.recentConversationIds
  return ids[ids.length - 1];
}

export default conversationSlice.reducer;
