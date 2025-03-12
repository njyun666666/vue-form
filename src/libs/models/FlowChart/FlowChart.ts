import type { Node } from '@vue-flow/core'

export interface FlowData {
  hello: string
}

export interface FlowEvents {
  [key: string]: (event: MouseEvent) => void
  onFlowEvent: (event: MouseEvent) => void
}

export type FlowNodeTypes = 'start' | 'end' | 'task' | 'getway'
export type FlowNode = Node<FlowData, FlowEvents, FlowNodeTypes>
