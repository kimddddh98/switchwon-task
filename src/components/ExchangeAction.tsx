import { useState } from 'react'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'

type ExchangeActionType = 'BUY' | 'SELL'

const EXCAHNGE_ACTION: Record<ExchangeActionType, ExchangeActionType> = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const

const ExchangeLayer = () => {
  return (
    <ul className="border-switchwon-gray-200 animate-fade-in absolute top-[calc(100%+8px)] left-0 w-[140px] rounded-2xl border bg-white py-2">
      <li>
        <button className="flex w-full items-center gap-3 py-3 pl-4 text-sm hover:bg-[#F7F8FA]">
          🇺🇸
          <span className="font-medium">미국 USD</span>
        </button>
      </li>
      <li>
        <button className="flex w-full items-center gap-3 py-3 pl-4 text-sm hover:bg-[#F7F8FA]">
          🇯🇵
          <span className="font-medium">일본 JPY</span>
        </button>
      </li>
    </ul>
  )
}

const ExchangeAction = () => {
  const [actionState, setActionState] = useState<ExchangeActionType>(
    EXCAHNGE_ACTION.BUY,
  )
  const [layerVisible, setLayerVisible] = useState(false)
  const handleActionState = (state: ExchangeActionType) => {
    setActionState(state)
  }
  const handleLayerToggle = () => {
    setLayerVisible((prev) => !prev)
  }
  return (
    <div className="bg-switchwon-gray-0 border-switchwon-gray-300 flex flex-col gap-8 rounded-2xl border px-8 py-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <button
            onClick={handleLayerToggle}
            className="text-switchwon-gray-800 inline-flex items-center gap-1 text-xl font-bold"
          >
            🇺🇸 USD 환전하기
            <ChevronDownIcon className={`${!layerVisible && 'rotate-180'}`} />
          </button>
          {layerVisible && <ExchangeLayer />}
        </div>

        <div className="border-switchwon-gray-300 flex rounded-2xl border bg-white p-3">
          <button
            onClick={() => handleActionState(EXCAHNGE_ACTION.BUY)}
            className={`flex-1 rounded-2xl py-4 text-xl font-bold transition ${actionState === EXCAHNGE_ACTION.BUY ? 'bg-switchwon-red text-white' : 'text-switchwon-red-disabled'}`}
          >
            살래요
          </button>
          <button
            onClick={() => handleActionState(EXCAHNGE_ACTION.SELL)}
            className={`flex-1 rounded-2xl py-4 text-xl font-bold transition ${actionState === EXCAHNGE_ACTION.SELL ? 'bg-switchwon-blue-500 text-white' : 'text-switchwon-blue-disabled'}`}
          >
            팔래요
          </button>
        </div>

        <div className="flex flex-col gap-4 pb-20">
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-xl font-medium">
              {actionState === EXCAHNGE_ACTION.BUY ? '매수' : '매도'} 금액
            </span>
            <div className="border-switchwon-gray-700 text-switchwon-gray-600 mt-3 flex items-center gap-2.5 rounded-xl border bg-white p-4 text-right text-xl font-medium">
              <input
                type="text"
                className="text-switchwon-gray-600 flex-1 text-right text-xl font-semibold"
              />
              <span>
                달러 {actionState === EXCAHNGE_ACTION.BUY ? '사기' : '팔기'}
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
              />
              <span
                className={`font-semibold ${actionState === EXCAHNGE_ACTION.BUY ? 'text-switchwon-red' : 'text-switchwon-blue-500'}`}
              >
                원{' '}
                {actionState === EXCAHNGE_ACTION.BUY
                  ? '필요해요'
                  : '받을 수 있어요'}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t-switchwon-gray-400 flex justify-between border-t pt-8 text-xl">
          <span className="text-switchwon-gray-600 font-medium">적용 환율</span>
          <b className="text-switchwon-blue-500 font-bold">
            1 USD = 1,320.50 원
          </b>
        </div>

        <button className="bg-switchwon-cta-1 mt-8 h-[77px] rounded-2xl text-[22px] font-bold text-white">
          환전하기
        </button>
      </div>
    </div>
  )
}

export default ExchangeAction
