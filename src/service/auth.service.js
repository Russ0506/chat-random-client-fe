import { axiosClient } from '../setup/axiosClient'
import { setMessage } from "../features/message";

const URL = "https://random-chat-api-server.herokuapp.com/users";

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
  localStorage.removeItem("user");
};
// const resetPwdEmailConfirm = (params) => {
//   return axios.post(`${URL}/password`, params);
// };

const resetPwd = async (params) => {
  try {
    const res = await axiosClient.put(`${URL}/password`, params)
    return res
  } catch (error) {
    console.log(error.response.data.errors[0]);
    return error.response.data.errors[0]
  }
}

const authService = {
  register,
  confirmRegister,
  login,
  logout,
  resetPwd,
  sendMailResetPass,
};
export default authService;