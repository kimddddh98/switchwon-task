import type { ExchangeRate } from '@/api/exchange'
import { getOrdersQuote, type OrdersQuoteRequestQuery } from '@/api/orders'
import type { OrderActionType } from '@/const/orders.const'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface OrdersQuoteMutation extends OrdersQuoteRequestQuery {
  actionState: OrderActionType
}

const useQuoteMutation = () => {
  const queryClient = useQueryClient()
  const quoteMutation = useMutation({
    mutationFn: (query: OrdersQuoteMutation) => getOrdersQuote(query),
    onSuccess: async (data, variables) => {
      await queryClient.cancelQueries({ queryKey: exchangeKey.exchnageRates() })
      queryClient.setQueryData(
        exchangeKey.exchnageRates(),
        (oldData: ExchangeRate[]) => {
          if (oldData) {
            return oldData.map((ex) =>
              ex.currency ===
              (variables.actionState === 'BUY'
                ? variables.toCurrency
                : variables.fromCurrency)
                ? { ...ex, rate: data.appliedRate }
                : ex,
            )
          }
          return oldData
        },
      )
    },
  })

  return {
    quoteMutation,
  }
}

export default useQuoteMutation
