import axios from "axios";
import { axiosClient } from '../setup/axiosClient'

const URL = "https://random-chat-api-server.herokuapp.com/users";

const register = async (params) => {
  try {
    const res = await axiosClient.post(`${URL}`, params)
    return res
  } catch (error) {
    console.log(error)
  }
};

const confirmRegister = async (params) => {
  try {
    const res = await axiosClient.get(`${URL}/confirmation`, params)
    return res
  } catch (error) {
    console.log(error)
  }
}

const login = async (params) => {
  try {
    const res = await axiosClient.post(`${URL}/sign_in`, params)
    return res
  } catch (error) {
    return error.response.data.errors[0]
  }
}

const logout = () => {
  localStorage.removeItem("user");
};
const resetPwdEmailConfirm = (params) => {
  return axios.post(`${URL}/password`, params);
};

const resetPwd = (params) => {
  return axios.put(`${URL}/password`, params);
}

const authService = {
  register,
  confirmRegister,
  login,
  logout,
  resetPwdEmailConfirm,
  resetPwd
};
export default authService;