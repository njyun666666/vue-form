import type { Node, NodeProps } from '@vue-flow/core'

export enum FlowTaskEnum {
  applicant = 'applicant',
  applicantDeptManager = 'applicantDeptManager',
  user = 'user',
  dept = 'dept',
  role = 'role'
}

export enum OwnerSettingEnum {
  hr = 'hr',
  func = 'func'
}

export interface FlowNodeData {
  label?: string
  task?: {
    type?: FlowTaskEnum
    ownerSetting?: OwnerSettingEnum
    owner?: string[]
    funcName?: string
  }
  gateway?: {
    funcName?: string
  }
}

export interface FlowNodeEvents {
  [key: string]: (event: MouseEvent) => void
  onFlowEvent: (event: MouseEvent) => void
}

export enum FlowNodeEnum {
  start = 'start',
  end = 'end',
  task = 'task',
  gateway = 'gateway'
}

export type FlowNodeTypes = keyof typeof FlowNodeEnum
export type FlowNode = Node<FlowNodeData, FlowNodeEvents, FlowNodeTypes>
export type FlowNodeProps = NodeProps<FlowNodeData, FlowNodeEvents, FlowNodeTypes>
