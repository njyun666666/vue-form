import appConfig from '@/appConfig'
import type { FormApplication, FormClass } from '@/libs/models/Form/Form'
import { formService } from '@/libs/services/formService'
import { HttpResponse, http } from 'msw'

export const formHandlers = [
  http.get(`${appConfig.FORM_API}${formService.applicationListUrl}`, () => {
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
  })
]
