import { useState } from 'react'
type ExchangeActionType = 'BUY' | 'SELL'
const EXCAHNGE_ACTION: Record<ExchangeActionType, ExchangeActionType> = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const

const ExchangeAction = () => {
  const [actionState, setActionState] = useState<ExchangeActionType>(
    EXCAHNGE_ACTION.BUY,
  )
  return (
    <div className="bg-switchwon-gray-0 border-switchwon-gray-300 flex flex-col gap-8 rounded-2xl border px-8 py-6">
      <div className="flex flex-col gap-4">
        <button className="text-switchwon-gray-800 text-xl font-bold">
          USD 환전하기
        </button>
        <div className="border-switchwon-gray-300 flex rounded-2xl border bg-white p-3">
          <button
            className={`flex-1 rounded-2xl py-4 text-xl font-bold ${actionState === EXCAHNGE_ACTION.BUY ? 'bg-switchwon-red text-white' : 'text-switchwon-red-disabled'}`}
          >
            살래요
          </button>
          <button
            className={`flex-1 rounded-2xl py-4 text-xl font-bold ${actionState === EXCAHNGE_ACTION.SELL ? 'bg-switchwon-blue-500 text-white' : 'text-switchwon-blue-disabled'}`}
          >
            팔래요
          </button>
        </div>

        <div className="flex flex-col gap-4 pb-20">
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-xl font-medium">
              매수 금액
            </span>
            <input
              type="text"
              className="text-switchwon-gray-600 border-switchwon-gray-700 mt-3 rounded-xl border bg-white p-4 text-right text-xl font-semibold"
            />
          </div>
          <div className="h-10 w-10 self-center rounded-full bg-gray-500"></div>
          <div className="flex flex-col">
            <span className="text-switchwon-gray-600 text-xl font-medium">
              매수 금액
            </span>
            <input
              type="text"
              className="text-switchwon-gray-600 border-switchwon-gray-700 mt-3 rounded-xl border bg-white p-4 text-xl font-semibold"
            />
          </div>
        </div>
        <div className="border-t-switchwon-gray-400 flex justify-between border-t pt-8 text-xl">
          <span className="text-switchwon-gray-600 font-medium">적용 환율</span>
          <b className="text-switchwon-blue-500 font-bold">
            1 USD = 1,320.50 원
          </b>
        </div>

        <button className="bg-switchwon-cta-1 mt-8 h-[77px] cursor-pointer rounded-2xl text-[22px] font-bold text-white">
          환전하기
        </button>
      </div>
    </div>
  )
}

export default ExchangeAction
