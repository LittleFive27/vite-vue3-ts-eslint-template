import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/'
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data
    }
    return Promise.reject()
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
export default service

export interface Result<T = unknown> {
  message: string
  code: number
  data: T

  [key: string]: any
}

export const http = {
  get<T = any>(url: string, data?: object): Promise<Result<T>> {
    return service.get<T, Result<T>>(url, data)
  },

  post<T = any>(url: string, data?: object): Promise<Result<T>> {
    return service.post<T, Result<T>>(url, data)
  }
}
