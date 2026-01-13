/* 
  최신 환율 조회 , 지갑 조회 api 작성
*/
import http from './axios'

export const EXCHANGE_ENDPOINTS = {
  EXCHANGE_RATES: '/exchange-rates/latest',
  WALLETS: '/wallets',
} as const

export interface ExchangeRate {
  exchangeRateId: number
  currency: string
  rate: number
  changePercentage: number
  applyDateTime: string
}
export interface WalletsResponse {
  totalKrwBalance: number
  wallets: Wallets[]
}
export interface Wallets {
  walletId: number
  currency: string
  balance: number
}

const getExchangeRates = async () => {
  const response = await http.get<BaseResponse<ExchangeRate[]>>(
    EXCHANGE_ENDPOINTS.EXCHANGE_RATES,
  )
  return response.data.data
}

const getWallets = async () => {
  const response = await http.get<BaseResponse<WalletsResponse>>(
    EXCHANGE_ENDPOINTS.WALLETS,
  )
  return response.data.data
}

export { getExchangeRates, getWallets }
