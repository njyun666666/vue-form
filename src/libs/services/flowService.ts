import formAPI from '../api/formAPI'
import type {
  FlowApprovalModel,
  FlowApprovalViewModel,
  FlowListItem,
  FlowSaveModel
} from '../models/Flow/FlowModel'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class FlowService {
  readonly approvalUrl = '/Flow/Approval'
  readonly listUrl = '/Flow/List'
  readonly saveUrl = '/Flow'

  approval(data: FlowApprovalModel) {
    return formAPI.post<FlowApprovalViewModel>(this.approvalUrl, data)
  }

  list(data: QueryModel<FlowListItem>) {
    return formAPI.post<QueryViewModel<FlowListItem>>(this.listUrl, data)
  }

  getFlow(flowId: string) {
    return formAPI.get<FlowSaveModel>(`${this.saveUrl}/${flowId}`)
  }

  createFlow(data: FlowSaveModel) {
    return formAPI.post<FlowSaveModel>(this.saveUrl, data)
  }

  updateFlow(flowId: string, data: FlowSaveModel) {
    return formAPI.put<FlowSaveModel>(`${this.saveUrl}/${flowId}`, data)
  }
}

export const flowService = new FlowService()
