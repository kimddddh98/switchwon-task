import { getAccessToken } from '@/api/auth'
import { getExchangeRates } from '@/api/exchange'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import { useQuery } from '@tanstack/react-query'

const useExchangeRatesQuery = () => {
  return useQuery({
    queryFn: getExchangeRates,
    queryKey: exchangeKey.exchnageRates(),
    enabled: !!getAccessToken(),
    refetchInterval: (data) => {
      return data.state.status === 'success' ? 60000 : false
    },
  })
}
export default useExchangeRatesQuery
