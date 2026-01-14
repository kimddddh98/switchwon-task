export type CurrencyType = 'USD' | 'JPY'

export const CURRENCY_VALUE: Record<CurrencyType, CurrencyType> = {
  USD: 'USD',
  JPY: 'JPY',
}

export interface Currency {
  icon: string
  name: string
  currency: CurrencyType
}

export const CURRENCIES: Record<CurrencyType, Currency> = {
  USD: {
    icon: '🇺🇸',
    name: '미국 USD',
    currency: CURRENCY_VALUE.USD,
  },
  JPY: {
    icon: '🇯🇵',
    name: '일본 JPY',
    currency: CURRENCY_VALUE.JPY,
  },
}
