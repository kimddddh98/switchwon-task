export const ordersKey = {
  base: ['orders'] as const,
  getOrders: () => [...ordersKey.base, 'get'] as const,
} as const
