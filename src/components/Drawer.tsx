import { ROUTES_KEY } from '@/routes/path'
import LogoutButton from './LogoutButton'
import NavButton from './NavButton'

type DrawerProps = {
  isVisible: boolean
  toggleDrawer: () => void
}

const Drawer = ({ isVisible, toggleDrawer }: DrawerProps) => {
  return (
    <div
      onClick={toggleDrawer}
      className={`fixed inset-0 z-50 bg-black/40 md:hidden ${isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 flex h-full w-72 flex-col justify-between bg-white p-4 shadow-xl transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col">
          <NavButton
            path={ROUTES_KEY.EXCHANGE}
            menuNm="환전 하기"
            onClick={toggleDrawer}
          />
          <NavButton path={ROUTES_KEY.EXCHANGE_LIST} menuNm="환전 내역" />
        </nav>
        <LogoutButton />
      </aside>
    </div>
  )
}

export default Drawer
