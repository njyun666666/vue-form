import { loginService } from '../services/loginService'
import HttpStatusCodes from './httpStatusCodes'
import appConfig from '@/appConfig'
import { useLoginStore } from '@/stores/login'
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

export interface ResponseErrors {
  message:
    | string
    | string[]
    | {
        [key: string]: string | string[]
      }
}

const baseURL = appConfig.FORM_API
const controller = new AbortController()
const CancelToken = axios.CancelToken
const source = CancelToken.source()
let isRefreshing = false
let refreshPromise: Promise<boolean>

const formAPI: Readonly<AxiosInstance> = axios.create({
  baseURL: baseURL
})

const AuthInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const loginStore = useLoginStore()
  const accessToken = loginStore.user?.access_token

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  config.cancelToken = source.token
  config.signal = controller.signal

  return config
}

const OnResponseSuccess = (response: AxiosResponse): AxiosResponse => response

const OnResponseFailure = async (error: AxiosError<ResponseErrors>): Promise<ResponseErrors> => {
  const loginStore = useLoginStore()
  const httpStatus = error.response?.status
  const errorUrl = error.config?.url?.toLowerCase().replace(/\/api/, '')

  switch (httpStatus) {
    case HttpStatusCodes.UNAUTHORIZED:
      if (errorUrl === loginService.loginUrl.toLowerCase()) {
        //
      } else if (errorUrl === loginService.refreshTokenUrl.toLowerCase()) {
        console.log('Refresh token failed')
        source.cancel()
        loginStore.logout()
      } else {
        // check have reflash token
        console.log('check have reflash token')
        const refresh_token = loginStore.user.refresh_token

        if (!refresh_token) {
          console.log('refresh_token is null', error)
          source.cancel()
          loginStore.logout()
        } else {
          // call refresh token
          if (!isRefreshing) {
            console.info('call refresh token')
            isRefreshing = true
            refreshPromise = loginStore.refresh()
          }

          const isRefresh = await refreshPromise
          isRefreshing = false

          if (!isRefresh) {
            console.log('RefreshToken error')
            source.cancel()
            loginStore.logout()
          } else {
            return await formAPI.request(error.config as AxiosRequestConfig)
          }
        }
      }

      break
    case HttpStatusCodes.NOT_FOUND:
      // console.log('Requested resource was not found.');
      break
    case HttpStatusCodes.FORBIDDEN:
      break
    default:
      break
  }

  return Promise.reject(error)
}

formAPI.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
formAPI.interceptors.request.use(AuthInterceptor)
formAPI.interceptors.response.use(OnResponseSuccess, OnResponseFailure)

export default formAPI
