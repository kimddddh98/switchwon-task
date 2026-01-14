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

type QuoteFormValue = {
  forexAmount: string
}

const ExchangeAction = () => {
  const queryClient = useQueryClient()
  const { quoteMutation } = useQuoteMutation()

  const exchangeData = queryClient.getQueryData<ExchangeRate[]>(
    exchangeKey.exchnageRates(),
  )

  const { control, handleSubmit } = useForm<QuoteFormValue>({
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
      alert('소숫점 2번째 자리까지 입력 가능합니다.')
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
    quoteMutation.mutate({
      forexAmount: Number(forexAmount),
      fromCurrency: actionState === ORDER_ACTION.BUY ? 'KRW' : currencyState,
      toCurrency: actionState === ORDER_ACTION.BUY ? currencyState : 'KRW',
      actionState,
    })
  }

  useEffect(() => {
    return () => {
      debouncedMutate.cancel()
    }
  }, [debouncedMutate])

  return (
    <div className="bg-switchwon-gray-0 border-switchwon-gray-300 flex flex-col gap-8 rounded-2xl border px-8 py-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <button
            type="button"
            onClick={handleLayerToggle}
            className="text-switchwon-gray-800 inline-flex items-center gap-1 text-xl font-bold"
          >
            {CURRENCIES[currencyState].icon + ' ' + currencyState} 환전하기
            <ChevronDownIcon className={`${!layerVisible && 'rotate-180'}`} />
          </button>
          {layerVisible && <ExchangeLayer onClick={handleCurrencyState} />}
        </div>

        <div className="border-switchwon-gray-300 flex rounded-2xl border bg-white p-3">
          <button
            type="button"
            onClick={() => handleActionState(ORDER_ACTION.BUY)}
            className={`flex-1 rounded-2xl py-4 text-xl font-bold transition ${actionState === ORDER_ACTION.BUY ? 'bg-switchwon-red text-white' : 'text-switchwon-red-disabled'}`}
          >
            살래요
          </button>
          <button
            type="button"
            onClick={() => handleActionState(ORDER_ACTION.SELL)}
            className={`flex-1 rounded-2xl py-4 text-xl font-bold transition ${actionState === ORDER_ACTION.SELL ? 'bg-switchwon-blue-500 text-white' : 'text-switchwon-blue-disabled'}`}
          >
            팔래요
          </button>
        </div>

        <div className="flex flex-col gap-4 pb-20">
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-xl font-medium">
              {actionState === ORDER_ACTION.BUY ? '매수' : '매도'} 금액
            </span>
            <div className="border-switchwon-gray-700 text-switchwon-gray-600 mt-3 flex items-center gap-2.5 rounded-xl border bg-white p-4 text-right text-xl font-medium">
              <Controller
                name="forexAmount"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatValue(field.value)}
                    className="text-switchwon-gray-600 flex-1 text-right text-xl font-semibold"
                    onChange={(e) => handleNumberChange(e, field)}
                  />
                )}
              />
              <span>
                {getCurrencyKrName(currencyState)?.value.split(' ')[1]}{' '}
                {actionState === ORDER_ACTION.BUY ? '사기' : '팔기'}
              </span>
            </div>
          </div>
          <div className="bg-switchwon-gray-300 h-10 w-10 self-center rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-xl font-medium">
              필요 원화
            </span>
            <div className="border-switchwon-gray-500 text-switchwon-gray-600 bg-switchwon-gray-100 mt-3 flex items-center gap-2.5 rounded-xl border p-4 text-right text-xl font-medium">
              <input
                type="text"
                className="text-switchwon-gray-600 flex-1 text-right text-xl font-semibold"
                value={
                  quoteMutation.data
                    ? formatNumber(quoteMutation.data?.krwAmount)
                    : 0
                }
                disabled
              />
              <span
                className={`font-semibold ${actionState === ORDER_ACTION.BUY ? 'text-switchwon-red' : 'text-switchwon-blue-500'}`}
              >
                원{' '}
                {actionState === ORDER_ACTION.BUY
                  ? '필요해요'
                  : '받을 수 있어요'}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t-switchwon-gray-400 flex justify-between border-t pt-8 text-xl">
          <span className="text-switchwon-gray-600 font-medium">적용 환율</span>
          <b className="text-switchwon-blue-500 font-bold">{appliedRate} 원</b>
        </div>

        <button className="bg-switchwon-cta-1 mt-8 h-[77px] rounded-2xl text-[22px] font-bold text-white">
          환전하기
        </button>
      </form>
    </div>
  )
}

export default ExchangeAction
