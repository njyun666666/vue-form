import formAPI from '../api/formAPI'
import type {
  FlowApprovalModel,
  FlowApprovalViewModel,
  FlowListItem
} from '../models/Flow/FlowModel'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class FlowService {
  readonly approvalUrl = '/Flow/Approval'
  readonly listUrl = '/Flow/List'

  approval(data: FlowApprovalModel) {
    return formAPI.post<FlowApprovalViewModel>(this.approvalUrl, data)
  }

  list(data: QueryModel<FlowListItem>) {
    return formAPI.post<QueryViewModel<FlowListItem>>(this.listUrl, data)
  }
}

export const flowService = new FlowService()
