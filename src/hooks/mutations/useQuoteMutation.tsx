import { getOrdersQuote, type OrdersQuoteRequestQuery } from '@/api/orders'
import { useMutation } from '@tanstack/react-query'

const useQuoteMutation = () => {
  const quoteMutation = useMutation({
    mutationFn: (query: OrdersQuoteRequestQuery) => getOrdersQuote(query),
    onSuccess(data) {
      /* 
        TODO
        성공시 적용 환율과 현재 조회되어있는 환율 정보가 다를시 해당 데이터 업데이트
      */
      console.log('onSuccess', data)
    },
  })

  return {
    quoteMutation,
  }
}

export default useQuoteMutation
