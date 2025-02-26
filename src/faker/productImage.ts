import { FileModel } from '@/libs/models/File/File'
import { uuid } from '@/libs/utils/uuid'

const list: FileModel[] = [
  new FileModel({
    id: 'asus-5090',
    groupId: '',
    name: 'Asus 5090',
    ext: 'webp',
    path: '/src/assets/images',
    size: 32154,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  }),
  new FileModel({
    id: 'asus-5090',
    groupId: '',
    name: 'Asus 5090',
    ext: 'webp',
    path: '/src/assets/images',
    size: 32154,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  }),
  new FileModel({
    id: 'asus-5080',
    groupId: '',
    name: 'Asus 5080',
    ext: 'webp',
    path: '/src/assets/images',
    size: 20234,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  }),
  new FileModel({
    id: 'asus-5070ti',
    groupId: '',
    name: 'Asus 5070ti',
    ext: 'webp',
    path: '/src/assets/images',
    size: 28978,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  }),
  new FileModel({
    id: 'msi-5090',
    groupId: '',
    name: 'MSI 5090',
    ext: 'webp',
    path: '/src/assets/images',
    size: 48468,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  }),
  new FileModel({
    id: 'msi-5080',
    groupId: '',
    name: 'MSI 5080',
    ext: 'webp',
    path: '/src/assets/images',
    size: 45710,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  }),
  new FileModel({
    id: 'msi-5070ti',
    groupId: '',
    name: 'MSI 5070ti',
    ext: 'webp',
    path: '/src/assets/images',
    size: 47978,
    updatedAt: new Date(),
    uploadedBy: 'admin'
  })
]

export const productImageFaker = (groupId?: string): FileModel => {
  list[0].groupId = groupId || uuid()
  return list[0]
}

export const multipleProductImageFaker = (length: number, groupId?: string): FileModel[] => {
  if (length > list.length) {
    length = list.length
  }

  groupId = groupId || uuid()
  return Array.from({ length: length }, (v, i) => {
    list[i].groupId = groupId
    return list[i]
  })
}
