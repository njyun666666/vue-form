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

export enum FlowButtonEnum {
  approve = 'approve',
  reject = 'reject',
  close = 'close',
  return = 'return'
}

export interface FlowNodeButtonConfig {
  enabled?: boolean
  funcName?: string
}

export enum GatewayConditionTypeEnum {
  func = 'func',
  default = 'default'
}

export interface GatewayCondition {
  name?: string
  type?: GatewayConditionTypeEnum
  funcName?: string
  targetNodeId?: string
}

export interface FlowNodeData {
  label?: string
  task?: {
    type?: FlowTaskEnum
    ownerSetting?: OwnerSettingEnum
    owner?: string[]
    funcName?: string
    buttons?: Partial<Record<FlowButtonEnum, FlowNodeButtonConfig>>
  }
  gateway?: {
    conditions?: GatewayCondition[]
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
