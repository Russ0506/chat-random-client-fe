import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userSettingService from "../service/user-setting.service";
import { setMessage } from "./message";
const user = JSON.parse(localStorage.getItem("user"));

export const saveDataSearch = createAsyncThunk(
  "user-setting/save-data-search-partner",
  async (params, thunkAPI) => {
    try {
      const data = await userSettingService.saveDataSearch(params);
      // thunkAPI.dispatch(setMessage(await userSettingService.saveDataSearch(params)));
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
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
