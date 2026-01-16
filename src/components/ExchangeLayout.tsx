import { Outlet, useMatches } from 'react-router-dom'
import Header from './Header'

type LayoutRouteHandle = {
  title: string
  description: string
}
const ExchangeLayout = () => {
  const matches = useMatches()
  const handle = matches[matches.length - 1]?.handle as
    | LayoutRouteHandle
    | undefined
  return (
    <div>
      <Header />
      <main className="mt-10 flex w-full flex-col gap-6 xl:mx-auto xl:w-7xl">
        <div>
          <h2 className="text-switchwon-gray-800 text-[40px] font-bold">
            {handle?.title}
          </h2>
          <p className="text-xl">{handle?.description}</p>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default ExchangeLayout
