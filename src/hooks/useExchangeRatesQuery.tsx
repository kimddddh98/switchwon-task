import { getAccessToken } from '@/api/auth'
import { getExchangeRates } from '@/api/exchange'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import { useQuery } from '@tanstack/react-query'

const useExchangeRatesQuery = () => {
  return useQuery({
    queryFn: getExchangeRates,
    queryKey: exchangeKey.exchnageRates(),
    enabled: !!getAccessToken(),
  })
}
export default useExchangeRatesQuery
