import appConfig from '@/appConfig'
import type { FlowApprovalModel, FlowApprovalViewModel } from '@/libs/models/Form/FlowModel'
import { flowService } from '@/libs/services/flowService'
import { HttpResponse, delay, http } from 'msw'

export const flowHandlers = [
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
  })
]
