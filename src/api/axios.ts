import URL from '@/const/urls.const'
import axios from 'axios'
import { getAccessToken } from './auth'

export const http = axios.create({
  baseURL: URL.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error)
  },
)

export default http
