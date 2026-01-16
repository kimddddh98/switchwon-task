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
      <main className="mt-6 mb-10 flex w-full flex-col gap-6 px-4 md:mt-10 md:px-6 xl:mx-auto xl:w-7xl xl:px-0">
        <div>
          <h2 className="text-switchwon-gray-800 text-2xl font-bold xl:text-[40px]">
            {handle?.title}
          </h2>
          <p className="md:text-xl">{handle?.description}</p>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default ExchangeLayout
