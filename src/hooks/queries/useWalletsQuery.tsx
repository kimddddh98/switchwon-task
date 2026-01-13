import { getAccessToken } from '@/api/auth'
import { getWallets } from '@/api/exchange'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import { useQuery } from '@tanstack/react-query'

const useWalletsQuery = () => {
  return useQuery({
    queryFn: getWallets,
    queryKey: exchangeKey.wallets(),
    enabled: !!getAccessToken(),
  })
}
export default useWalletsQuery
