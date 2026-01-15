export type OrderActionType = 'BUY' | 'SELL'
export const ORDER_ACTION: Record<OrderActionType, OrderActionType> = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const
