import type { OrgDeptLevel } from '@/libs/models/OrgDeptLevel/OrgDeptLevel'

export const orgDeptLevelList: OrgDeptLevel[] = [
  { levelId: 'level-001', levelName: '公司層級', level: 1 },
  { levelId: 'level-002', levelName: '部門層級', level: 2 },
  { levelId: 'level-003', levelName: '組別層級', level: 3 }
]

export const orgDeptLevelMap: Record<string, OrgDeptLevel> = Object.fromEntries(
  orgDeptLevelList.map((l) => [l.levelId, l])
)
