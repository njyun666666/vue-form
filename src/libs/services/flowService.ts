import formAPI from '../api/formAPI'
import type { FlowApprovalModel, FlowApprovalViewModel } from '../models/Form/FlowModel'

class FlowService {
  readonly approvalUrl = '/Flow/Approval'

  approval(data: FlowApprovalModel) {
    return formAPI.post<FlowApprovalViewModel>(this.approvalUrl, data)
  }
}

export const flowService = new FlowService()
