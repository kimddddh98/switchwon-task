import { useAuth } from '@/hooks/useAuth'

const LogoutButton = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <button
      onClick={handleLogout}
      className="bg-switchwon-blue-500 rounded-lg px-3 py-2 font-semibold text-white md:rounded-xl md:text-xl xl:rounded-2xl"
    >
      Log out
    </button>
  )
}
export default LogoutButton
