import { FormActionEnum } from '@/libs/enums/FormTypes'
import type { ApprovalHistoryItemModel } from '@/libs/models/Form/FormModel'

export const approvalHistoryFaker: Record<string, ApprovalHistoryItemModel[]> = {
  A002: [
    {
      stepId: 'start-4f49f5d3a4914dfabb9c25f88484d545',
      approverName: 'User',
      result: FormActionEnum.application,
      comment: '申請',
      approvalTime: new Date('2025-02-25T09:00:00Z')
    }
  ],
  A003: [
    {
      stepId: 'start-4f49f5d3a4914dfabb9c25f88484d545',
      approverName: 'User',
      result: FormActionEnum.application,
      comment: '申請',
      approvalTime: new Date('2025-02-25T09:00:00Z')
    },
    {
      stepId: 'task-675a9047c9b8478da2098886e1183de7',
      approverName: 'Admin',
      result: FormActionEnum.approve,
      comment: '同意',
      approvalTime: new Date('2025-02-26T08:00:00Z')
    }
  ]
}
