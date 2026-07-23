import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { TokenManager } from '@/infrastructure/storage/TokenManager'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenManager.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

let isRefreshing = false
let pendingQueue: Array<(token: string) => void> = []

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig

    const isAuthRoute = originalRequest?.url?.includes('/auth/') || originalRequest?.url?.includes('/register')

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingQueue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(apiClient(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/refresh`, null, {
          headers: { Authorization: `Bearer ${TokenManager.getToken()}` },
        })
        TokenManager.setToken(data.access_token)
        pendingQueue.forEach((cb) => cb(data.access_token))
        pendingQueue = []
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        TokenManager.clearToken()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)