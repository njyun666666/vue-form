import type { JwtPayload } from 'jwt-decode'

export interface LoginModel {
  email?: string | null
  password: string
}

export interface LoginViewModel {
  access_token: string
  refresh_token: string
}

export interface RefreshTokenModel {
  refresh_token: string
}

export interface UserPayload extends JwtPayload {
  uid: string
  role: string | string[]
  photoUrl?: string
}
