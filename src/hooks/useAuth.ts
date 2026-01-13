import { removeAccessToken, setAccessToken, signIn } from '@/api/auth'
import { ROUTES } from '@/routes/path'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()

  const login = async (email: string) => {
    const data = await signIn(email)
    const token = data.token
    setAccessToken(token)
  }

  const logout = () => {
    removeAccessToken()
    navigate(ROUTES.SIGN_IN, {
      replace: true,
    })
  }

  return {
    login,
    logout,
  }
}
