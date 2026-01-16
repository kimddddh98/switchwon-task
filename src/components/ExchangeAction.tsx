import { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'
import {
  Controller,
  useForm,
  type ControllerRenderProps,
} from 'react-hook-form'
import { formatNumber, getCurrencyKrName } from '@/utiles'
import useQuoteMutation from '@/hooks/mutations/useQuoteMutation'
import { useQueryClient } from '@tanstack/react-query'
import { exchangeKey } from '@/const/query-key/exchangeKey.const'
import type { ExchangeRate } from '@/api/exchange'
import ExchangeLayer from './ExchangeLayer'
import {
  CURRENCIES,
  CURRENCY_VALUE,
  type CurrencyType,
} from '@/const/currency.const'
import { ORDER_ACTION, type OrderActionType } from '@/const/orders.const'
import useRequestOrderMutation from '@/hooks/mutations/useRequestOrderMutation'
import { TOAST_TYPE, useToastActions } from '@/store/toastStore'

type QuoteFormValue = {
  forexAmount: string
}

const ExchangeAction = () => {
  const queryClient = useQueryClient()
  const { quoteMutation } = useQuoteMutation()
  const { requestOrderMutation } = useRequestOrderMutation()
  const { toastShow } = useToastActions()

  const exchangeData = queryClient.getQueryData<ExchangeRate[]>(
    exchangeKey.exchnageRates(),
  )

  const { control, handleSubmit, setValue } = useForm<QuoteFormValue>({
    defaultValues: {
      forexAmount: '0',
    },
  })
  /* 사기 / 팔기 */
  const [actionState, setActionState] = useState<OrderActionType>(
    ORDER_ACTION.BUY,
  )
  /* USD / JPY */
  const [currencyState, setCurrencyState] = useState<CurrencyType>(
    CURRENCY_VALUE.USD,
  )
  const [layerVisible, setLayerVisible] = useState(false)

  /* 견적 조회 시 적용 환율 */
  const appliedRate = useMemo(() => {
    let defaultText = `1 ${currencyState} = `
    if (quoteMutation.data) {
      return (defaultText += formatNumber(quoteMutation.data.appliedRate))
    }
    const findExchangeData = exchangeData?.find(
      (ex) => ex.currency === currencyState,
    )
    if (findExchangeData) {
      return (defaultText += formatNumber(findExchangeData.rate))
    }
    defaultText += 0

    return defaultText
  }, [currencyState, quoteMutation, exchangeData])

  const debouncedMutate = useMemo(
    () => debounce(quoteMutation.mutate, 300),
    [quoteMutation.mutate],
  )

  const handleActionState = (state: OrderActionType) => {
    setActionState(state)
  }
  const handleLayerToggle = () => {
    setLayerVisible((prev) => !prev)
  }
  const handleCurrencyState = (state: CurrencyType) => {
    quoteMutation.reset()
    setCurrencyState(state)
    setValue('forexAmount', '0')
    handleLayerToggle()
  }

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<QuoteFormValue, 'forexAmount'>,
  ) => {
    const raw = e.target.value.replace(/,/g, '')
    if (!/^\d*\.?\d*$/.test(raw)) return

    const [_, decimal] = raw.split('.')
    if (decimal && decimal.length > 2) {
      toastShow(TOAST_TYPE.ERROR, '소숫점 2번째 자리까지 입력 가능합니다.')
      return
    }
    field.onChange(raw)
    if (Number(raw) > 0) {
      debouncedMutate({
        forexAmount: Number(raw),
        fromCurrency: actionState === ORDER_ACTION.BUY ? 'KRW' : currencyState,
        toCurrency: actionState === ORDER_ACTION.BUY ? currencyState : 'KRW',
        actionState,
      })
    } else {
      quoteMutation.reset()
    }
  }

  const formatValue = (value: string) => {
    const [int, decimal] = value.split('.')
    if (value.endsWith('.')) {
      const intVal = formatNumber(Number(int))
      return intVal + '.' + decimal
    }

    return formatNumber(Number(value))
  }

  const onSubmit = ({ forexAmount }: QuoteFormValue) => {
    if (Number(forexAmount) <= 0) {
      return toastShow(TOAST_TYPE.ERROR, '주문금액은 0보다 커야 합니다.')
    }
    requestOrderMutation.mutate(
      {
        forexAmount: Number(forexAmount),
        fromCurrency: actionState === ORDER_ACTION.BUY ? 'KRW' : currencyState,
        toCurrency: actionState === ORDER_ACTION.BUY ? currencyState : 'KRW',
        currencyState,
      },
      {
        onSuccess: () => {
          setValue('forexAmount', '0')
          quoteMutation.reset()
        },
      },
    )
  }

  useEffect(() => {
    return () => {
      debouncedMutate.cancel()
    }
  }, [debouncedMutate])

  return (
    <div className="bg-switchwon-gray-0 border-switchwon-gray-300 flex flex-col gap-8 rounded-2xl border px-6 py-4 md:px-8 md:py-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <button
            type="button"
            onClick={handleLayerToggle}
            className="text-switchwon-gray-800 inline-flex items-center gap-1 text-lg font-bold md:text-xl"
          >
            {CURRENCIES[currencyState].icon + ' ' + currencyState} 환전하기
            <ChevronDownIcon
              className={`h-5 w-5 md:h-6 md:w-6 ${!layerVisible && 'rotate-180'}`}
            />
          </button>
          {layerVisible && <ExchangeLayer onClick={handleCurrencyState} />}
        </div>

        <div className="border-switchwon-gray-300 flex rounded-2xl border bg-white p-2 xl:p-3">
          <button
            type="button"
            onClick={() => handleActionState(ORDER_ACTION.BUY)}
            className={`flex-1 rounded-2xl py-2 text-lg font-bold transition xl:py-4 xl:text-xl ${actionState === ORDER_ACTION.BUY ? 'bg-switchwon-red text-white' : 'text-switchwon-red-disabled'}`}
          >
            살래요
          </button>
          <button
            type="button"
            onClick={() => handleActionState(ORDER_ACTION.SELL)}
            className={`flex-1 rounded-2xl py-2 text-lg font-bold transition md:py-2.5 xl:py-4 xl:text-xl ${actionState === ORDER_ACTION.SELL ? 'bg-switchwon-blue-500 text-white' : 'text-switchwon-blue-disabled'}`}
          >
            팔래요
          </button>
        </div>

        <div className="flex flex-col gap-4 pb-10 xl:pb-20">
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-lg font-medium xl:text-xl">
              {actionState === ORDER_ACTION.BUY ? '매수' : '매도'} 금액
            </span>
            <div className="border-switchwon-gray-700 text-switchwon-gray-600 mt-3 flex items-center justify-end gap-1.5 rounded-xl border bg-white p-2 font-medium xl:gap-2.5 xl:p-4 xl:text-xl">
              <Controller
                name="forexAmount"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatValue(field.value)}
                    className="text-switchwon-gray-600 flex-1 text-right text-lg font-semibold xl:text-xl"
                    onChange={(e) => handleNumberChange(e, field)}
                  />
                )}
              />
              <span className="shrink-0 text-sm xl:text-base">
                {getCurrencyKrName(currencyState)?.value.split(' ')[1]}{' '}
                {actionState === ORDER_ACTION.BUY ? '사기' : '팔기'}
              </span>
            </div>
          </div>
          <div className="bg-switchwon-gray-300 h-8 w-8 self-center rounded-full md:h-10 md:w-10"></div>
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-lg font-medium xl:text-xl">
              필요 원화
            </span>
            <div className="border-switchwon-gray-500 text-switchwon-gray-600 bg-switchwon-gray-100 mt-3 flex items-center justify-end gap-1.5 rounded-xl border p-2 text-lg font-medium xl:gap-2.5 xl:p-4 xl:text-xl">
              <input
                type="text"
                className="text-switchwon-gray-600 flex-1 text-right text-lg font-semibold xl:text-xl"
                value={
                  quoteMutation.data
                    ? formatNumber(quoteMutation.data?.krwAmount)
                    : 0
                }
                disabled
              />
              <span
                className={`shrink-0 text-sm font-semibold xl:text-base ${actionState === ORDER_ACTION.BUY ? 'text-switchwon-red' : 'text-switchwon-blue-500'}`}
              >
                원{' '}
                {actionState === ORDER_ACTION.BUY
                  ? '필요해요'
                  : '받을 수 있어요'}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t-switchwon-gray-400 flex items-center justify-between border-t pt-8 text-xl">
          <span className="text-switchwon-gray-600 text-[15px] font-medium md:text-base">
            적용 환율
          </span>
          <b className="text-switchwon-gray-600 text-lg font-semibold md:text-xl">
            {appliedRate} 원
          </b>
        </div>

        <button
          type="submit"
          className="bg-switchwon-cta-1 mt-4 h-14 rounded-2xl text-lg text-[22px] font-bold text-white md:h-16 xl:mt-8 xl:h-[77px] xl:text-[22px]"
        >
          환전하기
        </button>
      </form>
    </div>
  )
}

export default ExchangeAction
