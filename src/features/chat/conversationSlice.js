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
  conversationsList: null,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    changeConversation: (state , { payload }) => {
      state.currentConversation = payload
    },
    pushConversations: (state, { payload }) => {
      state.recentConversationIds= state.recentConversationIds.filter((id) => id !== payload)
      state.recentConversationIds.push(payload);
    },
    setConversationsList: (state , { payload }) => {
      state.conversationsList = payload
    },
  }
});

export const { changeConversation, pushConversations, setConversationsList } = conversationSlice.actions;

export const selectConversation = (state) => {
  return state.conversation.currentConversation;
}

export default conversationSlice.reducer;
