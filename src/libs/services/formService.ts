import formAPI from '../api/formAPI'
import type {
  FormApplication,
  FormBaseInfoModel,
  FormCheckAuthViewModel,
  FormPageInfoModel,
  PendingApprovalModel
} from '../models/Form/FormModel'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class FormService {
  readonly applicationListUrl = '/form/application-list'
  readonly checkAuthUrl = '/form/check-auth'
  readonly pendingApprovalListUrl = '/form/pending-approval-list'

  applicationList() {
    return formAPI.get<FormApplication[]>(this.applicationListUrl)
  }

  pendingApprovalList(data: QueryModel<PendingApprovalModel>) {
    return formAPI.post<QueryViewModel<PendingApprovalModel>>(this.pendingApprovalListUrl, data)
  }

  checkAuth(pageInfo: FormPageInfoModel) {
    return formAPI.get<FormCheckAuthViewModel>(
      `${this.checkAuthUrl}/${pageInfo.formPageAction}/${pageInfo.formClass}/${pageInfo.formId ?? ''}`
    )
  }
}

export const formService = new FormService()
