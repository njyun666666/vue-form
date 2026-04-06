import formAPI from '@/libs/api/formAPI'

export const routeAuthService = {
  checkUrl: '/auth/route',
  checkRoute: (routeName: string) =>
    formAPI.get(routeAuthService.checkUrl, { params: { routeName } })
}
