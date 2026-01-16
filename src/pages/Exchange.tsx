import ExchangeAction from '@/components/ExchangeAction'
import ExchangeInfoCard from '@/components/ExchangeInfoCard'
import MyWallet from '@/components/MyWallet'
import useExchangeRatesQuery from '@/hooks/queries/useExchangeRatesQuery'

const Exchange = () => {
  const { data } = useExchangeRatesQuery()
  return (
    <section className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-col gap-6 md:flex-1">
        <div className="flex flex-col gap-5 md:flex-row">
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
