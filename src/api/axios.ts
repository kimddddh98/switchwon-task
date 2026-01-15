import URL from '@/const/urls.const'
import axios, { AxiosError } from 'axios'
import { getAccessToken, removeAccessToken } from './auth'
import { ERROR_CODES } from '@/const/errors.const'
import { ROUTES } from '@/routes/path'
import { useToastStore } from '@/store/toastStore'

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
  async (error: AxiosError<BaseResponse<any>>) => {
    if (error) {
      // 401 에러 처리
      if (!error.response) {
        return Promise.reject<BaseResponse<any>>({
          code: 'NETWORK_ERROR',
          message: '네트워크 오류가 발생했습니다',
        })
      }

      const { code } = error.response.data

      if (code && code === ERROR_CODES.UNAUTHORIZED) {
        removeAccessToken()
        window.location.href = ROUTES.SIGN_IN
      }
      const apiUrl = error.request.responseURL.split(
        URL.webUrl + URL.baseUrl,
      )[1]
      console.log(`api 에러 발생 : ${apiUrl}`, error.response)

      return Promise.reject<BaseResponse<any>>(error.response.data)
    }
  },
)

export default http
