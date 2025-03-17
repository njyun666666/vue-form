import type { Node, NodeProps } from '@vue-flow/core'

export interface FlowNodeData {
  label?: string
  toolbarVisible?: boolean
  action?: string
}

export interface FlowNodeEvents {
  [key: string]: (event: MouseEvent) => void
  onFlowEvent: (event: MouseEvent) => void
}

export enum FlowNodeEnum {
  start = 'start',
  end = 'end',
  task = 'task',
  getway = 'getway'
}

export type FlowNodeTypes = keyof typeof FlowNodeEnum
export type FlowNode = Node<FlowNodeData, FlowNodeEvents, FlowNodeTypes>
export type FlowNodeProps = NodeProps<FlowNodeData, FlowNodeEvents, FlowNodeTypes>
