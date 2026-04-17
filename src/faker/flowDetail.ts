import flowAflow1 from './flow/A-flow-1.json'
import flow001 from './flow/FLOW-001.json'
import flow002 from './flow/FLOW-002.json'
import type { FlowSaveModel } from '@/libs/models/Flow/FlowModel'

export const flowDetailFaker: Record<string, FlowSaveModel> = {
  'FLOW-001': flow001,
  'FLOW-002': flow002,
  'A-flow-1': flowAflow1
}
