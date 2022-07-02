import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const axiosClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
})

export const axiosMultipartForm = axios.create({
  baseURL,
  headers: { "Content-Type": "multipart/form-data" }
})

export function setupAxios(store) {
    // Add a request interceptor
    axiosClient.interceptors.request.use(
      function(config) {
        // Do something before request is sent
        // const { auth: { accessToken } } = store.getState()
        //
        // if (accessToken) {
        //   config.headers.Authorization = `Bearer ${accessToken}`
        // }
        return config
      },
      function(error) {
        return Promise.reject(error)
      },
    )

    axiosClient.interceptors.response.use(
      function(response) {
        return response.data
      },
      async function(error) {
        return Promise.reject(error)
      },
    )
  }
