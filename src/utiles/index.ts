const formatNumber = (value: number) =>
  new Intl.NumberFormat('ko').format(value)

const getCurrencySymbol = (currency: string) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  })
    .formatToParts()
    .find((r) => r.type === 'currency')

const getCurrencyKrName = (currency: string) =>
  new Intl.NumberFormat('ko', {
    style: 'currency',
    currency,
    currencyDisplay: 'name',
  })
    .formatToParts()
    .find((r) => r.type === 'currency')

export { formatNumber, getCurrencySymbol, getCurrencyKrName }
