import axios from "axios";
import { axiosClient } from '../setup/axiosClient'

const URL = "users"

const register = (username, email, password) => {
  return axios.post(`${URL}/signup`, {
    username,
    email,
    password,
  });
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
  return axios.post(API_URL + "/users/password", params);
};

const resetPwd = (params) => {
  return axios.put(API_URL + "/users/password", params);
}

const authService = {
  register,
  login,
  logout,
  resetPwdEmailConfirm,
  resetPwd
};
export default authService;