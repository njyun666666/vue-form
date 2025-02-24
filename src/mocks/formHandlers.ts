import appConfig from '@/appConfig'
import type { AModel } from '@/libs/models/Form/A/A'
import type {
  FormApplication,
  FormCheckAuthViewModel,
  FormSaveViewModel
} from '@/libs/models/Form/FormModel'
import { formService } from '@/libs/services/formService'
import { aService } from '@/libs/services/forms/aService'
import { FormPageAction } from '@/libs/types/FormTypes'
import { uuid } from '@/libs/utils/uuid'
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
  http.get(
    `${appConfig.FORM_API}${formService.checkAuthUrl}/:formPageAction/:formClass/:formId`,
    async ({ params }) => {
      await delay()
      const { formPageAction, formClass, formId } = params
      return HttpResponse.json({
        formPageAction: [FormPageAction.add, FormPageAction.info, FormPageAction.sign],
        flowId: `${formClass}-flow-1`,
        step: 2
      } as FormCheckAuthViewModel)
    }
  ),
  http.get(
    `${appConfig.FORM_API}${formService.checkAuthUrl}/add/:formClass`,
    async ({ params }) => {
      await delay()
      const { formClass } = params
      return HttpResponse.json({
        formPageAction: [FormPageAction.add, FormPageAction.info, FormPageAction.sign],
        flowId: `${formClass}-flow-1`,
        step: 1
      } as FormCheckAuthViewModel)
    }
  ),
  http.get(`${appConfig.FORM_API}${aService.dataUrl}/:formId`, async ({ params }) => {
    await delay()
    const { formId } = params
    return HttpResponse.json({
      baseInfo: {
        formId: `${formId}`,
        applicationId: 'e68f5118902be0daaef0fa3300b643b6',
        applicationName: 'Admin',
        applicationDate: '2025-02-24T06:36:33.631Z'
      },
      info: { title: 'TEST TITLE', content: 'test content' },
      productDetail: [
        {
          id: 'bfd4ac7b',
          name: 'Asus 5090',
          price: 100000,
          description: 'Asus 5090',
          image: '47bdb38dd5da47f68966dca19cb6aaed',
          category: 'gpu'
        },
        {
          id: 'fbb520ca',
          name: 'Asus 5080',
          price: 70000,
          description: 'Asus 5080',
          image: 'c1417b423eed42089891feeeb919923c',
          category: 'gpu'
        }
      ]
    })
  }),
  http.post(`${appConfig.FORM_API}/api/:formClass/Save`, async ({ params }) => {
    await delay()
    const { formClass } = params
    return HttpResponse.json({
      result: true,
      formId: `${formClass}001`,
      formClass: formClass
    } as FormSaveViewModel)
  })
]
