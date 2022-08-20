import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostList: (state, { payload }) => {
      state.posts = payload
    },
  },
});

export const { setPostList } = postSlice.actions;

export const selectPosts = (state) => {
  return state.post;
}

export default postSlice.reducer;
