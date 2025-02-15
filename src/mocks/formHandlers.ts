import appConfig from '@/appConfig'
import type { FormApplication, FormCheckAuthViewModel } from '@/libs/models/Form/Form'
import { formService } from '@/libs/services/formService'
import { HttpResponse, delay, http } from 'msw'

export const formHandlers = [
  http.get(`${appConfig.FORM_API}${formService.applicationListUrl}`, async () => {
    await delay()

    return HttpResponse.json([
      {
        groupId: 'hr',
        groupName: 'Form.Group.HR',
        list: [
          {
            formClass: 'A',
            formClassName: 'Form.Class.A'
          },
          {
            formClass: 'B',
            formClassName: 'Form.Class.B'
          }
        ]
      },
      {
        groupId: 'it',
        groupName: 'Form.Group.IT',
        list: [
          {
            formClass: 'A',
            formClassName: 'Form.Class.A'
          },
          {
            formClass: 'B',
            formClassName: 'Form.Class.B'
          }
        ]
      }
    ] as FormApplication[])
  }),
  http.get(`${appConfig.FORM_API}${formService.checkAuthUrl}/add/*/*`, async () => {
    await delay()
    return HttpResponse.json({
      formPageType: ['add', 'info', 'sign']
    } as FormCheckAuthViewModel)
  })
]
