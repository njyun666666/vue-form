import { A001, A002, A003, A004, A005 } from './aform'
import { FormStatusEnum } from '@/libs/enums/FormTypes'

export const formFaker = {
  A001: {
    step: 'start-4f49f5d3a4914dfabb9c25f88484d545',
    data: A001,
    status: FormStatusEnum.draft
  },
  A002: {
    step: 'task-675a9047c9b8478da2098886e1183de7',
    data: A002,
    status: FormStatusEnum.pending
  },
  A003: {
    step: 'task-66896d1e4e914ed4a0f60cd685c2f563',
    data: A003,
    status: FormStatusEnum.pending
  },
  A004: {
    step: 'start-4f49f5d3a4914dfabb9c25f88484d545',
    data: A004,
    status: FormStatusEnum.returned
  },
  A005: {
    step: 'end-a1b2c3d4e5f6',
    data: A005,
    status: FormStatusEnum.rejected
  }
}
