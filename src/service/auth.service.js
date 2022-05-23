import axios from "axios";
import { API_URL } from "../constant/url";
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
const login = (params) => {
  return axios
    .post(`${API_URL}/users/signin`, params)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
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