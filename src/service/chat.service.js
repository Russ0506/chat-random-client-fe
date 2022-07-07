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

const loadConversation = async (params, thunkAPI) => {
  try {
    const res = await axiosClient.get(`${URL}/conversations/${params.conversation_id}/messages`)
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

// const sendMesage = async (params, thunkAPI) => {
//   try {
//     const res = await axiosClient.post(`${URL}/conversations/${params.conversationId}/messages`, {
//       text: params.text,
//       recipient_id: params.recipient_id,
//     })
//     return res
//   } catch (error) {
//     const message =
//       (error.response.data.errors[0]) ||
//       error.message ||
//       error.toString();
//     thunkAPI.dispatch(setMessage(message));
//     return thunkAPI.rejectWithValue();
//   }
// };

const chatService = {
  enqueuingChat,
  loadConversation,
  // sendMesage,
};
export default chatService;
