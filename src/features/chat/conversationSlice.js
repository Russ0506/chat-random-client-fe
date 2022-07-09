import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
      console.log(state);
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
