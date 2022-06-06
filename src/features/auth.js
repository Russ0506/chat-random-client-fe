import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../service/auth.service";
import { async } from "validate.js";
const user = JSON.parse(localStorage.getItem("user"));
export const resetPwd = createAsyncThunk(
  "auth/resetPwd",
  async (params, thunkAPI) => {
    try {
      console.log("resetPwd");
      let response = await AuthService.resetPwd(params);
      thunkAPI.dispatch(setMessage(await AuthService.resetPwd(params)));
      return response.data;
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

// export const resetPwdEmailConfirm = createAsyncThunk(
//   "auth/resetPwdConfirm",
//   async (params, thunkAPI) => {
//     try {
//       console.log("reset password email confirm");
//       let response = await AuthService.resetPwdEmailConfirm(params);
//       thunkAPI.dispatch(setMessage(response.data.message));
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

export const register = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI) => {
    try {
      const response = await AuthService.register(params);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
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

export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.login(params);
      thunkAPI.dispatch(setMessage(await AuthService.login(params)));
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

export const sendMailResetPass = createAsyncThunk(
  "auth/send-email-reset-pas",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.sendMailResetPass(params);
      thunkAPI.dispatch(setMessage(await AuthService.sendMailResetPass(params)));
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});
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
      state.isLoggedIn = true;
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
