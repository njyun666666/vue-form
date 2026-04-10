export interface OrgTreeNode {
  type: 'dept' | 'user'
  id: string
  label: string
  jobTitle?: string
  isManager?: boolean
  children?: OrgTreeNode[]
}
