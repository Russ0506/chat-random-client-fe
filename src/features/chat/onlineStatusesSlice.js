import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestStatuses: {},
};

export const onlineStatusesSlice = createSlice({
  name: 'onlineStatuses',
  initialState,
  reducers: {
    partnerGoOnline: (state, { payload }) => {
      state.latestStatuses[payload.user_id] = { is_online: true }
    },
    partnerGoOffline: (state, { payload }) => {
      state.latestStatuses[payload.user_id] = {
        is_online: false,
        last_online: payload.last_online
      }
    }
  },
});

export const { partnerGoOnline, partnerGoOffline } = onlineStatusesSlice.actions;

export const selectOnlineStatus = (state, userId) => {
  return state.onlineStatuses.latestStatuses[userId];
}

export default onlineStatusesSlice.reducer;
