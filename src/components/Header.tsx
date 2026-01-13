import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/routes/path'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <header className="border-b-switchwon-gray-300 flex h-[75px] items-center justify-between border-b px-10">
      <div className="text-2xl font-bold">Exchange app</div>
      <nav className="flex items-center gap-10">
        <div>
          <NavLink
            to={ROUTES.EXCHANGE}
            className={`px-3 py-2 text-xl font-bold`}
          >
            환전 하기
          </NavLink>
          <NavLink
            to={ROUTES.EXCHANGE_LIST}
            className="px-3 py-2 text-xl font-medium text-[#8899AA]"
          >
            환전 내역
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="bg-switchwon-blue-500 rounded-2xl px-3 py-2 text-xl font-semibold text-white"
        >
          Log out
        </button>
      </nav>
    </header>
  )
}

export default Header
