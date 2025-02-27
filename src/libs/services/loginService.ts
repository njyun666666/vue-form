import formAPI from '../api/formAPI'
import type { LoginModel, LoginViewModel, RefreshTokenModel } from '../models/Login/Login'

class LoginService {
  readonly loginUrl = '/api/Login'
  readonly refreshTokenUrl = '/api/Login/RefreshToken'

  login(data: LoginModel) {
    return formAPI.post<LoginViewModel>(this.loginUrl, data)
  }

  refresh(data: RefreshTokenModel) {
    return formAPI.post<LoginViewModel>(this.refreshTokenUrl, data)
  }
}

export const loginService = new LoginService()
