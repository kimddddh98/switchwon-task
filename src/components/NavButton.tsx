import { ROUTES, type RouteKeyType } from '@/routes/path'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

type NavButtonProps = {
  path: RouteKeyType
  menuNm: string
  onClick?: () => void
}
const NavButton = ({ path, menuNm, onClick }: NavButtonProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <NavLink
      onClick={(e) => {
        e.preventDefault()
        navigate(ROUTES[path])
        if (onClick) {
          onClick()
        }
      }}
      to={ROUTES[path]}
      className={`border-switchwon-gray-300 border-b px-3 py-2 md:border-0 xl:text-xl ${pathname === ROUTES[path] ? 'font-bold' : 'font-medium text-[#8899AA]'}`}
    >
      {menuNm}
    </NavLink>
  )
}

export default NavButton
