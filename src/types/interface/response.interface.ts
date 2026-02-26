export interface IResponseMessage {
  code: number
  message: string
}

export interface IResponseEntity<T> {
  code: number
  message: string
  data: T
}

interface MetaPagination {
  page: number
  limit: number
  totalPage: number
  totalData: number
}

export interface IResponsePagination<T> extends IResponseEntity<T> {
  meta: MetaPagination
}

export interface IResponseError {
  code: number
  message: string
  path: string
}
