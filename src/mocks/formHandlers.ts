import appConfig from '@/appConfig'
import { approvalHistoryFaker } from '@/faker/approvalHistory'
import { flowDetailFaker } from '@/faker/flowDetail'
import { formFaker } from '@/faker/form'
import { FormActionEnum, FormPageActionEnum, FormStatusEnum } from '@/libs/enums/FormTypes'
import type {
  FormApplication,
  FormBaseInfoModel,
  FormCheckAuthViewModel,
  FormSaveViewModel,
  MyApplicationModel,
  MyHandledModel
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

      const flowId = `${formClass}-flow-1`
      return HttpResponse.json({
        formPageAction: [
          FormPageActionEnum.application,
          FormPageActionEnum.info,
          FormPageActionEnum.approval
        ],
        flowId,
        stepId: String(form.step),
        flow: flowDetailFaker[flowId] ?? null,
        formStatus: form.status,
        canRecall: form.status === FormStatusEnum.pending && formId === 'A002'
      } as FormCheckAuthViewModel)
    }
  ),
  http.get(
    `${appConfig.FORM_API}${formService.checkAuthUrl}/:formPageAction/:formClass`,
    async ({ params }) => {
      await delay()
      const { formClass } = params
      const flowId = `${formClass}-flow-1`
      return HttpResponse.json({
        formPageAction: [
          FormPageActionEnum.application,
          FormPageActionEnum.info,
          FormPageActionEnum.approval
        ],
        flowId,
        stepId: '1',
        flow: flowDetailFaker[flowId] ?? null
      } as FormCheckAuthViewModel)
    }
  ),
  http.post(`${appConfig.FORM_API}/api/:formClass/Save`, async ({ params, request }) => {
    await delay()
    const { formClass } = params
    const json = (await request.json()) as { baseInfo: FormBaseInfoModel; isDraft?: boolean }
    const formId = json?.baseInfo?.formId || `${formClass}002`

    return HttpResponse.json({
      result: true,
      formId: formId,
      formClass: formClass,
      isDraft: json?.isDraft ?? false
    } as FormSaveViewModel)
  }),
  http.get(`${appConfig.FORM_API}${formService.approvalHistoryUrl}/:formId`, async ({ params }) => {
    await delay()
    const { formId } = params
    return HttpResponse.json(approvalHistoryFaker[formId as string] ?? [])
  }),
  http.post(`${appConfig.FORM_API}${formService.myApplicationListUrl}`, async () => {
    await delay()
    return HttpResponse.json({
      pageCount: 1,
      count: 4,
      data: [
        {
          formId: 'A001',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-24T08:00:00.000Z',
          description: '草稿表單',
          status: FormStatusEnum.draft
        },
        {
          formId: 'A002',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-25T03:04:05.000Z',
          description: '標題: 測試第2步<br/>內容: <i>A002</i> test',
          status: FormStatusEnum.pending
        },
        {
          formId: 'A003',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-26T08:15:55.000Z',
          description: '標題: 測試第3步<br/>內容: <i>A003</i> test',
          status: FormStatusEnum.approved
        },
        {
          formId: 'A004',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-27T10:00:00.000Z',
          description: '已退回需修改',
          status: FormStatusEnum.returned
        }
      ]
    } as unknown as QueryViewModel<MyApplicationModel>)
  }),
  http.post(`${appConfig.FORM_API}${formService.myHandledListUrl}`, async () => {
    await delay()
    return HttpResponse.json({
      pageCount: 1,
      count: 2,
      data: [
        {
          formId: 'A003',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-26T08:15:55.000Z',
          description: '標題: 測試第3步',
          stepName: '部門主管',
          action: FormActionEnum.approve,
          comment: '同意',
          approvalTime: '2025-02-26T09:00:00.000Z'
        },
        {
          formId: 'A005',
          formClass: 'A',
          applicantId: 'user1',
          applicantName: 'User1',
          applicationDate: '2025-03-01T09:00:00.000Z',
          description: '標題: 測試表單',
          stepName: '處級主管',
          action: FormActionEnum.reject,
          comment: '不符規定',
          approvalTime: '2025-03-01T14:00:00.000Z'
        }
      ]
    } as unknown as QueryViewModel<MyHandledModel>)
  }),
  http.post(`${appConfig.FORM_API}${formService.recallUrl}/:formId`, async ({ params }) => {
    await delay()
    return HttpResponse.json({
      result: true,
      formId: params.formId as string
    } as FormSaveViewModel)
  }),
  http.post(`${appConfig.FORM_API}${formService.pendingApprovalListUrl}`, async ({ params }) => {
    await delay()
    // const { formClass } = params
    return HttpResponse.json({
      pageCount: 1,
      count: 2,
      data: [
        {
          formId: 'A002',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-25T03:04:05.000Z',
          description: '標題: 測試第2步<br/>內容: <i>A002</i> test',
          approvalId: 'a002001',
          arrivedDate: '2025-02-25T04:23:06.000Z',
          approverId: 'admin',
          approverName: 'Admin',
          stepId: '2',
          stepName: '部門主管'
        },
        {
          formId: 'A003',
          formClass: 'A',
          applicantId: 'admin',
          applicantName: 'Admin',
          applicationDate: '2025-02-26T08:15:55.000Z',
          description: '標題: 測試第3步<br/>內容: <i>A003</i> test',
          approvalId: 'a003001',
          arrivedDate: '2025-02-26T08:45:17.000Z',
          approverId: 'admin',
          approverName: 'Admin',
          stepId: '3',
          stepName: '處級主管'
        }
      ]
    } as QueryViewModel<unknown>)
  })
]
