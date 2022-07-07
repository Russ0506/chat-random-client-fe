import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    changeConversation: (state, { payload }) => {
      return payload
    }
  }
});

export const { changeConversation } = conversationSlice.actions;

export const selectConversation = (state) => {
  return state.conversation;
}

export default conversationSlice.reducer;
