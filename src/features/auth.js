import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../service/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

export const resetPwd = createAsyncThunk(
  "auth/resetPwd",
  async (params, thunkAPI) => {
    const data = await AuthService.resetPwd(params, thunkAPI);
    return data
  }
);

export const registerConfirm = createAsyncThunk(
  "auth/register-confirm",
  async (params, thunkAPI) => {
    try {
      const response = await AuthService.confirmRegister(params);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setMessage(error.toString()));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI) => {
      return await AuthService.register(params, thunkAPI);
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const data = await AuthService.login(params, thunkAPI);
    return data
  }
);

export const sendMailResetPass = createAsyncThunk(
  "auth/send-email-reset-pas",
  async (params, thunkAPI) => {
    return await AuthService.sendMailResetPass(params, thunkAPI);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const user_verify = createAsyncThunk(
  "auth/user_verify",
  async (params, thunkAPI) => {
    try {
      let response = await AuthService.userVerify();
      return response;
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

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn =  action.payload.success;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
