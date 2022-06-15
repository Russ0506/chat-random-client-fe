import { axiosClient } from '../setup/axiosClient'
import { setMessage } from "../features/message";

const URL = "user_setting"

const saveDataSearch = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`${URL}/update_or_create`, params)
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

const getDataSearch = async (thunkAPI) => {
  try {
    const res = await axiosClient.get(`${URL}`)
    console.log(res);
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

const userSettingService = {
  saveDataSearch,
  getDataSearch,
};
export default userSettingService;