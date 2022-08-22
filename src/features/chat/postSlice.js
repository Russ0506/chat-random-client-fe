import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  userSetting: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostList: (state, { payload }) => {
      state.posts = payload
    },
    setUserSettingState: (state, { payload }) => {
      state.userSetting = {}
      state.userSetting = payload
    },
  },
});

export const { setPostList, setUserSettingState } = postSlice.actions;

export const selectPosts = (state) => {
  return state.post;
}

export default postSlice.reducer;
