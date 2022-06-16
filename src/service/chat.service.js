import { axiosClient } from '../setup/axiosClient'
import { setMessage } from "../features/message";

const URL = ""

const enqueuingChat = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.post(`${URL}/enqueuing`)
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

const chatService = {
  enqueuingChat,
};
export default chatService;