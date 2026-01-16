export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  EXCHANGE: '/exchange',
  EXCHANGE_LIST: '/exchange-list',
} as const

export type RouteKeyType = keyof typeof ROUTES
export const ROUTES_KEY: Record<RouteKeyType, RouteKeyType> = {
  HOME: 'HOME',
  SIGN_IN: 'SIGN_IN',
  EXCHANGE: 'EXCHANGE',
  EXCHANGE_LIST: 'EXCHANGE_LIST',
}
