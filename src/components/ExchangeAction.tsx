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
      </div>
    </div>
  )
}

export default ExchangeAction
