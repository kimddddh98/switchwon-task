import http from './axios'

/* 
  환전 주문 관련 api 작성
*/
export const ORDERS_ENDPOINTS = {
  /* 
    GET : 환전 주문 내역 조회
    POST : 환전 주문 요청
  */
  OREDRS: '/orders',
  // 주문 견적 조회
  OREDRS_QUOTE: '/orders/quote',
} as const

export type OrdersQuoteRequestQuery = {
  fromCurrency: string
  toCurrency: string
  forexAmount: number
}

export type OrdersQuoteResponseType = {
  krwAmount: number
  appliedRate: number
}

const getOrdersQuote = async (query: OrdersQuoteRequestQuery) => {
  const response = await http.get<BaseResponse<OrdersQuoteResponseType>>(
    ORDERS_ENDPOINTS.OREDRS_QUOTE,
    {
      params: query,
    },
  )

  return response.data.data
}

export { getOrdersQuote }
