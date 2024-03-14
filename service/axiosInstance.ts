import axios from 'axios'

import { BASE_URL, BASE_TOKEN_REFRESH } from './url'

//TODO CHANGE CONTENT-TYPE
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: false
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },

  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post(BASE_TOKEN_REFRESH, {
          refresh: localStorage.getItem('refresh'),
        })

        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)

        return axiosClient(originalRequest)
      } catch (_error) {
        return Promise.reject(_error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient
