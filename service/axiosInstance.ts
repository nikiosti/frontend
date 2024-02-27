import axios from 'axios'

//TODO CHANGE CONTENT-TYPE
const axiosClient = axios.create({
  baseURL: 'https://nikiostin.pythonanywhere.com/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
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
        const { data } = await axios.post('https://nikiostin.pythonanywhere.com/api/token/refresh/', {
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
