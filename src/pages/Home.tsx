import { getAccessToken } from '@/api/auth'
import { ROUTES } from '@/routes/path'
import { Navigate } from 'react-router-dom'

export default function Home() {
  const token = getAccessToken()

  return token ? (
    <Navigate to={ROUTES.EXCHANGE} replace />
  ) : (
    <Navigate to={ROUTES.SIGN_IN} replace />
  )
}
