import URL from '@/const/urls.const'
import axios from 'axios'
import { getAccessToken, removeAccessToken } from './auth'
import { ERROR_CODES } from '@/const/errors.const'
import { ROUTES } from '@/routes/path'

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
    if (error) {
      // 401 에러 처리
      if (error.response.data.code === ERROR_CODES.UNAUTHORIZED) {
        removeAccessToken()
        window.location.href = ROUTES.SIGN_IN
      }
      console.log('에러 발생', error?.response?.data)
      if (error?.response?.data) {
        return Promise.reject(error?.response?.data)
      }
    }
    return Promise.reject(error)
  },
)

export default http
