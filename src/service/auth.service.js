import { axiosClient } from '../setup/axiosClient'
import { setMessage } from "../features/message";

const URL = "users"

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
    const res = await axiosClient.get(`${URL}/confirmation`, {params: params})
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
    setMessage(error.response.data.errors[0])
    return error.response.data.errors[0]
  }
}

const sendMailResetPass = async (params) => {
  try {
    const res = await axiosClient.post(`${URL}/password`, params)
    return res
  } catch (error) {
    return error.response.data.errors[0]
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