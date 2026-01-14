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

export interface OrdersQuoteRequestQuery {
  fromCurrency: string
  toCurrency: string
  forexAmount: number
}

export interface OrdersQuoteResponseType {
  krwAmount: number
  appliedRate: number
}

export interface RquestOrdersParams extends OrdersQuoteRequestQuery {
  exchangeRateId: number
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

const requestOrder = async (params: RquestOrdersParams) => {
  const response = await http.post(ORDERS_ENDPOINTS.OREDRS, params)

  return response.data.data
}

export { getOrdersQuote, requestOrder }
