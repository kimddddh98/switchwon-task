import { ROUTES } from '@/routes/path'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      홈<NavLink to={ROUTES.SIGN_IN}>로그인</NavLink>
    </div>
  )
}
