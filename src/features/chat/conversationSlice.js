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
  currentConversation: null,
  recentConversationIds: [],
  newConversations: [],
  listConversation: [],
  idsOfUnreadCon: [],
  latestStatuses: {}
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    changeConversation: (state, { payload }) => {
      state.idsOfUnreadCon = state.idsOfUnreadCon.filter(id => id !== payload.id) // update list id of unread conversation if user choose the currentconversation
      state.currentConversation = payload
    },
    touchConversation: (state, { payload }) => {
      state.recentConversationIds.push(payload.conversationId);
    },
    createNewConversation: (state, { payload }) => {
      state.newConversations.push(payload)
    },
    updateConversationLatestStatus: (state, { payload }) => {
      state.latestStatuses[payload.conversation_id] = payload.status
    },
    setIdsOfUnreadCon: (state, { payload }) => {
      state.idsOfUnreadCon = payload
    },
    resetIdsOfUnreadCon: (state, { payload }) => {
      state.idsOfUnreadCon = []
    },
    setlistConversation:  (state, { payload }) => {
      state.listConversation = payload
    },
  }
});

export const {
  changeConversation,
  touchConversation,
  createNewConversation,
  updateConversationLatestStatus,
  setIdsOfUnreadCon,
  resetIdsOfUnreadCon,
  setlistConversation,
} = conversationSlice.actions;

export const selectConversation = (state) => {
  return state.conversation.currentConversation;
}

export const selectMostRecentConversationId = (state) => {
  const ids = state.conversation.recentConversationIds
  return ids[ids.length - 1];
}

export const selectConversationLatestStatus = (state, conversationId) => {
  return state.conversation.latestStatuses[conversationId];
}

export const selectNewestConversations = (state) => {
  if (state.conversation.newConversations) {
    return state.conversation.newConversations[state.conversation.newConversations.length - 1];
  } else {
    return null;
  }
}

export default conversationSlice.reducer;
