export class FileModel {
  id?: string
  groupId?: string
  name?: string
  ext?: string
  path?: string
  size?: number
  updatedAt?: Date
  uploadedBy?: string
  isDeleted?: boolean

  constructor(input: FileModel) {
    this.id = input.id
    this.groupId = input.groupId
    this.name = input.name
    this.ext = input.ext
    this.path = input.path
    this.size = input.size
    this.updatedAt = input.updatedAt
    this.uploadedBy = input.uploadedBy
    this.isDeleted = input.isDeleted
  }

  get url() {
    return `${this.path}/${this.id}.${this.ext}`
  }
}
