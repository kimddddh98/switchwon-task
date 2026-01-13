import http from './axios'

export const AUTH_ENDPOINTS = {
  SIGN_IN: '/auth/login',
} as const

type SignInResponseType = {
  memberId: number
  token: string
}

const ACCESS_TOKEN_KEY = 'accessToken'

const signIn = async (email: string) => {
  const response = await http.post<BaseResponse<SignInResponseType>>(
    AUTH_ENDPOINTS.SIGN_IN,
    null,
    {
      params: { email },
    },
  )
  return response.data.data
}

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export { signIn, getAccessToken, setAccessToken, removeAccessToken }
