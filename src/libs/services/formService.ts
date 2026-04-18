import formAPI from '../api/formAPI'
import type {
  ApprovalHistoryItemModel,
  FormApplication,
  FormCheckAuthViewModel,
  FormPageInfoModel,
  FormSaveViewModel,
  MyApplicationModel,
  MyHandledModel,
  PendingApprovalModel
} from '../models/Form/FormModel'
import type { QueryModel, QueryViewModel } from '../models/Query/QueryModel'

class FormService {
  readonly applicationListUrl = '/form/application-list'
  readonly checkAuthUrl = '/form/check-auth'
  readonly pendingApprovalListUrl = '/form/pending-approval-list'
  readonly approvalHistoryUrl = '/form/approval-history'
  readonly myApplicationListUrl = '/form/my-application-list'
  readonly myHandledListUrl = '/form/my-handled-list'
  readonly recallUrl = '/form/recall'

  applicationList() {
    return formAPI.get<FormApplication[]>(this.applicationListUrl)
  }

  pendingApprovalList(data: QueryModel<PendingApprovalModel>) {
    return formAPI.post<QueryViewModel<PendingApprovalModel>>(this.pendingApprovalListUrl, data)
  }

  getApprovalHistory(formId: string) {
    return formAPI.get<ApprovalHistoryItemModel[]>(`${this.approvalHistoryUrl}/${formId}`)
  }

  checkAuth(pageInfo: FormPageInfoModel) {
    return formAPI.get<FormCheckAuthViewModel>(
      `${this.checkAuthUrl}/${pageInfo.formPageAction}/${pageInfo.formClass}/${pageInfo.formId ?? ''}`
    )
  }

  myApplicationList(data: QueryModel<MyApplicationModel>) {
    return formAPI.post<QueryViewModel<MyApplicationModel>>(this.myApplicationListUrl, data)
  }

  myHandledList(data: QueryModel<MyHandledModel>) {
    return formAPI.post<QueryViewModel<MyHandledModel>>(this.myHandledListUrl, data)
  }

  recall(formId: string) {
    return formAPI.post<FormSaveViewModel>(`${this.recallUrl}/${formId}`, {})
  }
}

export const formService = new FormService()
