import { axiosClient } from '../setup/axiosClient'

const URL = "user_setting"

const saveDataSearch = async (params) => {
  try {
    const res = await axiosClient.post(`${URL}/update_or_create`, params)
    return res
  } catch (error) {
    console.log(error)
  }
};

const userSettingService = {
    saveDataSearch,
};
export default userSettingService;