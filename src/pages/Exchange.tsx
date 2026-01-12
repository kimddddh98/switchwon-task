import ExchangeAction from '@/components/ExchangeAction'
import ExchangeInfoCard from '@/components/ExchangeInfoCard'
import Header from '@/components/Header'
import MyWallet from '@/components/MyWallet'

const Exchange = () => {
  return (
    <div>
      <Header />
      <main className="mx-auto mt-10 flex w-7xl flex-col gap-6">
        <div>
          <h2 className="text-switchwon-gray-800 text-[40px] font-bold">
            환율 정보
          </h2>
          <p className="text-xl">실시간 환율을 확인하고 간편하게 환전하세요.</p>
        </div>
        <section className="flex gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex gap-5">
              <ExchangeInfoCard />
              <ExchangeInfoCard />
            </div>
            <MyWallet />
          </div>
          <div className="flex-1">
            <ExchangeAction />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Exchange
