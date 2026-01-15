import { getOrders } from '@/api/orders'
import { ordersKey } from '@/const/query-key/orders'
import { useQuery } from '@tanstack/react-query'

const useGetOrdersQuery = () => {
  return useQuery({
    queryKey: ordersKey.getOrders(),
    queryFn: getOrders,
  })
}

export default useGetOrdersQuery
