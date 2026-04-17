import type { OrgJobTitle } from '@/libs/models/OrgJobTitle/OrgJobTitle'

export const orgJobTitleList: OrgJobTitle[] = [
  { jobTitleId: 'jobtitle-001', jobTitleName: '工程師', jobLevel: 3 },
  { jobTitleId: 'jobtitle-002', jobTitleName: '資深工程師', jobLevel: 4 },
  { jobTitleId: 'jobtitle-003', jobTitleName: '主任工程師', jobLevel: 5 },
  { jobTitleId: 'jobtitle-004', jobTitleName: '業務專員', jobLevel: 3 },
  { jobTitleId: 'jobtitle-005', jobTitleName: '業務經理', jobLevel: 6 },
  { jobTitleId: 'jobtitle-006', jobTitleName: '人資專員', jobLevel: 3 },
  { jobTitleId: 'jobtitle-007', jobTitleName: '人資主任', jobLevel: 5 },
  { jobTitleId: 'jobtitle-008', jobTitleName: '系統架構師', jobLevel: 7 },
  { jobTitleId: 'jobtitle-009', jobTitleName: 'UI設計師', jobLevel: 3 },
  { jobTitleId: 'jobtitle-010', jobTitleName: '技術部經理', jobLevel: 6 }
]

export const orgJobTitleMap: Record<string, OrgJobTitle> = Object.fromEntries(
  orgJobTitleList.map((t) => [t.jobTitleId, t])
)
