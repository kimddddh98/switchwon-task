import type { ExchangeRate } from '@/api/exchange'
import PercentageUpIcon from '@/assets/icons/percentage-up.svg?react'
import PercentageDownIcon from '@/assets/icons/percentage-down.svg?react'
type ExchangeInfoCardProps = {
  exchange: ExchangeRate
}

const ExchangeInfoMark: Record<string, string> = {
  USD: '$',
  JPY: '¥',
} as const
const ExchangeInfoText: Record<string, string> = {
  USD: '미국 달러',
  JPY: '일본 엔화',
} as const

const ExchangeInfoCard = ({ exchange }: ExchangeInfoCardProps) => {
  return (
    <div className="border-switchwon-gray-300 flex flex-1 justify-between rounded-xl border px-8 py-6">
      <div className="flex flex-col gap-1">
        <h4 className="text-switchwon-gray-600 text-lg font-semibold">
          {exchange.currency}
        </h4>
        <div className="flex flex-col gap-1">
          <strong className="text-xl font-bold">
            {exchange.rate} {ExchangeInfoMark[exchange.currency]}
          </strong>
          <span
            className={`inline-flex items-center gap-1 ${exchange.changePercentage >= 0 ? 'text-switchwon-red' : 'text-switchwon-blue-500'}`}
          >
            {exchange.changePercentage >= 0 ? (
              <PercentageUpIcon width={20} height={20} />
            ) : (
              <PercentageDownIcon width={20} height={20} />
            )}
            {exchange.changePercentage}%
          </span>
        </div>
      </div>
      <div className="text-switchwon-gray-600">
        {ExchangeInfoText[exchange.currency]}
      </div>
    </div>
  )
}
export default ExchangeInfoCard
