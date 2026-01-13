export const exchangeKey = {
  base: ['exchange'] as const,
  exchnageRates: () => [...exchangeKey.base, 'rates'] as const,
  wallets: () => [...exchangeKey.base, 'wallets'] as const,
} as const
