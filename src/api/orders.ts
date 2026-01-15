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

export interface RequestOrdersParams extends OrdersQuoteRequestQuery {
  exchangeRateId: number
}

export interface Orders {
  appliedRate: number
  fromAmount: number
  fromCurrency: string
  orderId: number
  orderedAt: string
  toAmount: number
  toCurrency: string
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

const requestOrder = async (params: RequestOrdersParams) => {
  const response = await http.post<BaseResponse<0>>(
    ORDERS_ENDPOINTS.OREDRS,
    params,
  )

  return response.data
}

const getOrders = async () => {
  const response = await http.get<BaseResponse<Orders[]>>(
    ORDERS_ENDPOINTS.OREDRS,
  )
  return response.data.data
}

export { getOrdersQuote, requestOrder, getOrders }
