import { CURRENCIES, type CurrencyType } from '@/const/currency.const'

type ExchangeLayerProps = {
  onClick: (state: CurrencyType) => void
}

const ExchangeLayer = ({ onClick }: ExchangeLayerProps) => {
  return (
    <ul className="border-switchwon-gray-200 animate-fade-in absolute top-[calc(100%+8px)] left-0 w-[140px] rounded-2xl border bg-white py-2">
      {Object.values(CURRENCIES).map((currency) => (
        <li key={currency.currency}>
          <button
            onClick={() => onClick(currency.currency)}
            type="button"
            className="flex w-full items-center gap-3 py-3 pl-4 text-sm hover:bg-[#F7F8FA]"
          >
            {currency.icon}
            <span className="font-medium">{currency.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ExchangeLayer
