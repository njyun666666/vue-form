import formAPI from '../api/formAPI'
import { FileModel } from '../models/File/File'

class FileService {
  readonly uploadUrl = '/File/Upload'
  readonly listUrl = '/File/List'

  upload(files: File | File[], groupId: string) {
    const formData = new FormData()
    formData.append('groupId', groupId)

    if (Array.isArray(files)) {
      files.forEach((file) => formData.append('files', file))
    } else {
      formData.append('files', files)
    }

    return formAPI
      .post<FileModel[]>(this.uploadUrl, formData)
      .then((res) => res.data.map((file) => new FileModel(file)))
  }

  list(groupId: string) {
    return formAPI
      .get<FileModel[]>(`${this.listUrl}/${groupId}`)
      .then((res) => res.data.map((file) => new FileModel(file)))
  }
}
export const fileService = new FileService()
