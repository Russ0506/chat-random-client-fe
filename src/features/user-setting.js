import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userSettingService from "../service/user-setting.service";
import { setMessage } from "./message";
const user = JSON.parse(localStorage.getItem("user"));

export const saveDataSearch = createAsyncThunk(
  "user-setting/save-data-search-partner",
  async (params, thunkAPI) => {
    return await userSettingService.saveDataSearch(params, thunkAPI);
  }
);

export const getDataSearch = createAsyncThunk(
  "user-setting/get-data-search",
  async (thunkAPI) => {
    return await userSettingService.getDataSearch(thunkAPI);
  }
);

const initialState = { isSaveDataSearch: false };
const userSettingSlice = createSlice({
  name: "user-setting",
  initialState,
  extraReducers: {
    [saveDataSearch.fulfilled]: (state, action) => {
      state.isSaveDataSearch = true;
    },
    [saveDataSearch.rejected]: (state, action) => {
      state.isSaveDataSearch = false;
    },
  },
});
const { reducer } = userSettingSlice;
export default reducer;
