import appConfig from '@/appConfig'
import { routeAuthService } from '@/libs/services/routeAuthService'
import { HttpResponse, http } from 'msw'

export const routeAuthHandlers = [
  http.get(`${appConfig.FORM_API}${routeAuthService.checkUrl}`, () => {
    return HttpResponse.json({ allowed: true }, { status: 200 })
  })
]
