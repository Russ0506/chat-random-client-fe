import { axiosClient } from '../setup/axiosClient'
import { setMessage } from "../features/message";

const URL = "users";
const URL_IDENTITY = "";
const URL_IMAGE = "/api"

const register = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`${URL}`, params)
    return res
  } catch (error) {
    const message =
      (error.response.data.errors[0]) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
};

const userVerify = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.get(`${URL_IDENTITY}/identity`)
    localStorage.setItem('role', res.role)
    return res
  } catch (error) {
    const message =
      (error.response.data.errors[0]) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
};

const confirmRegister = async (params) => {
  try {
    const res = await axiosClient.get(`${URL}/confirmation`, { params: params })
    return res
  } catch (error) {
    console.log(error)
  }
}

const login = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`${URL}/sign_in`, params)
    localStorage.setItem('jwt_token', res.user.jwt_token)
    localStorage.setItem('user_display_name', res.user.name)
    localStorage.setItem('user_id', res.user.id)
    localStorage.setItem('avatar_path', res.user.avatar_path != '' ? `${URL_IMAGE}` + res.user.avatar_path : '')
    return res
  } catch (error) {
    const message =
      (error.response.data.errors[0]) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
}

const sendMailResetPass = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`${URL}/password`, params)
    return res
  } catch (error) {
    const message =
      (error.response.data.errors[0]) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
}

const logout = () => {
  return axiosClient.delete(`${URL}/sign_out`)
};

const resetPwd = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.put(`${URL}/password`, params)
    return res
  } catch (error) {
    const message =
      (error.response.data.errors[0]) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
}

const authService = {
  register,
  confirmRegister,
  login,
  logout,
  resetPwd,
  sendMailResetPass,
  userVerify
};
export default authService;
