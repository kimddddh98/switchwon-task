import { getExchangeRates } from '@/api/exchange'
import { requestOrder, type RequestOrdersParams } from '@/api/orders'
import type { CurrencyType } from '@/const/currency.const'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface RequestOrdersMutationParams extends Omit<
  RequestOrdersParams,
  'exchangeRateId'
> {
  currencyState: CurrencyType
}

const useRequestOrderMutation = () => {
  const queryClient = useQueryClient()
  const requestOrderMutation = useMutation({
    mutationFn: async (params: RequestOrdersMutationParams) => {
      try {
        const exchangeResponse = await queryClient.fetchQuery({
          queryKey: exchangeKey.exchnageRates(),
          queryFn: getExchangeRates,
          retry: 1,
        })
        const rateId = exchangeResponse?.find(
          (r) => r.currency === params.currencyState,
        )?.exchangeRateId
        if (!rateId) throw new Error('환율 정보를 찾을 수 없습니다.')
        return requestOrder({ ...params, exchangeRateId: rateId })
      } catch (error) {
        throw {
          error,
        }
      }
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: exchangeKey.wallets(),
      })
      alert(data.message)
    },
    onError(error, variables, onMutateResult, context) {
      /* 
        TODO : 에러 테스트

        INVALID_AMOUNT_SCALE
        JPY 통화는 소수점 0자리까지만 허용됩니다. 입력된 소수점 자릿수: 1

        INVALID_AMOUNT_MIN
        USD 통화는 최소 주문 금액이 1 이상이어야 합니다. 입력된 금액: 0.1

        VALIDATION_ERROR forexAmount
        주문금액은 0보다 커야 합니다.
      */

      console.log('환전 주문중 에러 발생', error)

      // if (error?.code === 'WALLET_INSUFFICIENT_BALANCE') {
      //   alert(error.message)
      // } else if (error?.code === 'VALIDATION_ERROR') {
      //   alert(error.data?.forexAmount)
      // } else if (error.code === 'INVALID_AMOUNT_MIN') {
      //   alert(error.message)
      // } else {
      // }
    },
  })

  return {
    requestOrderMutation,
  }
}

export default useRequestOrderMutation
