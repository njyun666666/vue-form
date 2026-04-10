import { uuid } from '@/libs/utils/uuid'

export class OrgUserDeptModel {
  private _guid?: string
  userDeptId?: string
  deptId?: string
  jobTitleId?: string
  isPrimary?: boolean
  isDeleted?: boolean

  constructor(input?: Partial<OrgUserDeptModel>) {
    this.userDeptId = input?.userDeptId
    this.deptId = input?.deptId
    this.jobTitleId = input?.jobTitleId
    this.isPrimary = input?.isPrimary ?? false
    this.isDeleted = input?.isDeleted ?? false
  }

  get guid() {
    this._guid = this.userDeptId || this._guid || uuid()
    return this._guid
  }
}
