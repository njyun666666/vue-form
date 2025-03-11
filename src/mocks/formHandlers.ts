import { PendingApprovalModel } from './../libs/models/Form/FormModel'
import appConfig from '@/appConfig'
import { formFaker } from '@/faker/form'
import { FormPageActionEnum } from '@/libs/enums/FormTypes'
import type {
  FormApplication,
  FormBaseInfoModel,
  FormCheckAuthViewModel,
  FormSaveViewModel
} from '@/libs/models/Form/FormModel'
import type { QueryViewModel } from '@/libs/models/Query/QueryModel'
import { formService } from '@/libs/services/formService'
import { HttpResponse, delay, http } from 'msw'

export const formHandlers = [
  http.get(`${appConfig.FORM_API}${formService.applicationListUrl}`, async () => {
    await delay()
    return HttpResponse.json([
      {
        groupId: 'HR',
        list: [
          {
            formClass: 'A'
          },
          {
            formClass: 'B'
          }
        ]
      },
      {
        groupId: 'IT',
        list: [
          {
            formClass: 'A'
          },
          {
            formClass: 'B'
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

      const form = formFaker[formId as keyof typeof formFaker]
      if (!form) {
        return HttpResponse.json({}, { status: 403 })
      }

      return HttpResponse.json({
        formPageAction: [
          FormPageActionEnum.application,
          FormPageActionEnum.info,
          FormPageActionEnum.approval
        ],
        flowId: `${formClass}-flow-1`,
        stepId: form.step
      } as FormCheckAuthViewModel)
    }
  ),
  http.get(
    `${appConfig.FORM_API}${formService.checkAuthUrl}/:formPageAction/:formClass`,
    async ({ params }) => {
      await delay()
      const { formClass } = params
      return HttpResponse.json({
        formPageAction: [
          FormPageActionEnum.application,
          FormPageActionEnum.info,
          FormPageActionEnum.approval
        ],
        flowId: `${formClass}-flow-1`,
        stepId: 1
      } as FormCheckAuthViewModel)
    }
  ),
  http.post(`${appConfig.FORM_API}/api/:formClass/Save`, async ({ params, request }) => {
    await delay()
    const { formClass } = params
    const json = (await request.json()) as { baseInfo: FormBaseInfoModel }
    const formId = json?.baseInfo?.formId || `${formClass}002`

    return HttpResponse.json({
      result: true,
      formId: formId,
      formClass: formClass
    } as FormSaveViewModel)
  }),
  http.post(`${appConfig.FORM_API}${formService.pandingApprovalListUrl}`, async ({ params }) => {
    await delay()
    // const { formClass } = params
    return HttpResponse.json({
      pageCount: 1,
      count: 2,
      data: [
        {
          formId: 'A002',
          formClass: 'A',
          applicationId: 'admin',
          applicationName: 'Admin',
          applicationDate: '2025-02-25T03:04:05.000Z',
          description: '標題: 測試第2步<br/>內容: <i>A002</i> test',
          approvalId: 'a002001',
          arrivedDate: '2025-02-25T04:23:06.000Z',
          approverId: 'admin',
          approverName: 'Admin',
          stepId: 2,
          stepName: '部門主管'
        },
        {
          formId: 'A003',
          formClass: 'A',
          applicationId: 'admin',
          applicationName: 'Admin',
          applicationDate: '2025-02-26T08:15:55.000Z',
          description: '標題: 測試第3步<br/>內容: <i>A003</i> test',
          approvalId: 'a003001',
          arrivedDate: '2025-02-26T08:45:17.000Z',
          approverId: 'admin',
          approverName: 'Admin',
          stepId: 3,
          stepName: '處級主管'
        }
      ]
    } as QueryViewModel<unknown>)
  })
]
