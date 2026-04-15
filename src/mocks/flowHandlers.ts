import appConfig from '@/appConfig'
import { flowListFaker } from '@/faker/flow'
import type {
  FlowApprovalModel,
  FlowApprovalViewModel,
  FlowListItem,
  FlowSaveModel
} from '@/libs/models/Flow/FlowModel'
import type { QueryViewModel } from '@/libs/models/Query/QueryModel'
import { flowService } from '@/libs/services/flowService'
import { HttpResponse, delay, http } from 'msw'

export const flowHandlers = [
  http.get(`${appConfig.FORM_API}${flowService.saveUrl}/:flowId`, async ({ params }) => {
    const item = flowListFaker.find((f) => f.flowId === params.flowId)
    await delay()
    return HttpResponse.json({
      flowId: item?.flowId,
      flowName: item?.flowName
    } satisfies FlowSaveModel)
  }),
  http.post(`${appConfig.FORM_API}${flowService.saveUrl}`, async ({ request }) => {
    const json = (await request.json()) as FlowSaveModel
    await delay()
    return HttpResponse.json({ ...json, flowId: crypto.randomUUID() } satisfies FlowSaveModel)
  }),
  http.put(`${appConfig.FORM_API}${flowService.saveUrl}/:flowId`, async ({ params, request }) => {
    const json = (await request.json()) as FlowSaveModel
    await delay()
    return HttpResponse.json({ ...json, flowId: params.flowId as string } satisfies FlowSaveModel)
  }),
  http.post(`${appConfig.FORM_API}${flowService.approvalUrl}`, async ({ request }) => {
    const json = (await request.json()) as FlowApprovalModel
    const formId = json.formId as string

    await delay()
    return HttpResponse.json({
      result: true,
      message: '',
      formId: formId,
      nextApproverId: 'admin',
      nextApproverName: 'Admin',
      nextStep: 3,
      nextStepName: '處級主管'
    } as FlowApprovalViewModel)
  }),
  http.post(`${appConfig.FORM_API}${flowService.listUrl}`, async () => {
    await delay()
    return HttpResponse.json({
      data: flowListFaker,
      pageCount: 1,
      count: flowListFaker.length
    } satisfies QueryViewModel<FlowListItem>)
  })
]
