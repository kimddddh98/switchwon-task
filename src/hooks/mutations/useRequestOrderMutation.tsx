import { getExchangeRates } from '@/api/exchange'
import { requestOrder, type RequestOrdersParams } from '@/api/orders'
import type { CurrencyType } from '@/const/currency.const'
import { ERROR_CODES } from '@/const/errors.const'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import { TOAST_TYPE, useToastActions } from '@/store/toastStore'
import { formatNumber } from '@/utiles'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface RequestOrdersMutationParams extends Omit<
  RequestOrdersParams,
  'exchangeRateId'
> {
  currencyState: CurrencyType
}

const useRequestOrderMutation = () => {
  const queryClient = useQueryClient()
  const { toastShow } = useToastActions()
  const requestOrderMutation = useMutation({
    mutationFn: async (params: RequestOrdersMutationParams) => {
      const exchangeResponse = await queryClient.fetchQuery({
        queryKey: exchangeKey.exchnageRates(),
        queryFn: getExchangeRates,
        retry: 1,
      })
      const findRate = exchangeResponse?.find(
        (r) => r.currency === params.currencyState,
      )
      if (!findRate) {
        throw {
          message: `${params.currencyState} 환율정보를 찾을 수 없습니다. 잠시 후 다시 시도해주세요.`,
        }
      }

      const { exchangeRateId, rate } = findRate
      const orderResponse = await requestOrder({
        ...params,
        exchangeRateId,
      })
      return { ...orderResponse, rate }
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: exchangeKey.wallets(),
      })
      toastShow(
        TOAST_TYPE.SUCCESS,
        `${data.message} 적용 환율 : ${formatNumber(data?.rate)}`,
      )
    },
    onError: (error: BaseResponse<Partial<RequestOrdersMutationParams>>) => {
      const { code, data, message } = error
      if (code === ERROR_CODES.VALIDATION_ERROR) {
        let text = ''
        for (const value of Object.values(data)) {
          if (value) {
            text += value + ''
          }
        }
        toastShow(TOAST_TYPE.ERROR, text)
      } else if (message) {
        toastShow(TOAST_TYPE.ERROR, message)
      }
    },
  })

  return {
    requestOrderMutation,
  }
}

export default useRequestOrderMutation
