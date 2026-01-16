import { ROUTES_KEY } from '@/routes/path'
import Drawer from './Drawer'
import LogoutButton from './LogoutButton'
import NavButton from './NavButton'
import { useState } from 'react'
import DrawerIcon from '@/assets/icons/drawer.svg?react'
const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev)
  }
  return (
    <header className="border-b-switchwon-gray-300 flex h-[75px] items-center justify-between border-b px-4 xl:px-10">
      <div className="pointer-events-none font-bold xl:text-2xl">
        Exchange app
      </div>
      <nav className="hidden items-center gap-10 md:flex">
        <div>
          <NavButton path={ROUTES_KEY.EXCHANGE} menuNm="환전 하기" />
          <NavButton path={ROUTES_KEY.EXCHANGE_LIST} menuNm="환전 내역" />
        </div>
        <LogoutButton />
      </nav>
      <button className="md:hidden" onClick={toggleDrawer}>
        <DrawerIcon />
      </button>
      <Drawer isVisible={drawerVisible} toggleDrawer={toggleDrawer} />
    </header>
  )
}

export default Header
