export {}

declare global {
  interface BaseResponse<T> {
    data: T
    message: string
    code: string
  }
}
