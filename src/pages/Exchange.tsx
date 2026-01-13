import ExchangeAction from '@/components/ExchangeAction'
import ExchangeInfoCard from '@/components/ExchangeInfoCard'
import MyWallet from '@/components/MyWallet'
import useExchangeRatesQuery from '@/hooks/useExchangeRatesQuery'

const Exchange = () => {
  const { data } = useExchangeRatesQuery()
  return (
    <section className="flex gap-6 pb-12">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex gap-5">
          {data?.map((ex) => (
            <ExchangeInfoCard key={ex.exchangeRateId} exchange={ex} />
          ))}
        </div>
        <MyWallet />
      </div>
      <div className="flex-1">
        <ExchangeAction />
      </div>
    </section>
  )
}

export default Exchange
