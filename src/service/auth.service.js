import axios from "axios";
import { axiosClient } from '../setup/axiosClient'

const URL = "users"

const register = async (params) => {
  try {
    const res = await axiosClient.post(`${URL}`, params)
    return res
  } catch (error) {
    console.log(error)
  }
};

const login = async (params) => {
  try {
    const res = await axiosClient.post(`${URL}/sign_in`, params)
    return res
  } catch (error) {
    console.log(error)
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
  login,
  logout,
  resetPwdEmailConfirm,
  resetPwd
};
export default authService;