<script setup lang="ts">
import BasePage from '../BasePage.vue'
import type { OrgTreeNode } from '@/libs/models/OrgTree/OrgTreeNode'
import { orgTreeService } from '@/libs/services/orgTreeService'
import { useQuery } from '@tanstack/vue-query'
import Card from 'primevue/card'
import Tree from 'primevue/tree'
import type { TreeNode } from 'primevue/treenode'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { data, isFetching } = useQuery({
  queryKey: [orgTreeService.treeUrl],
  queryFn: () => orgTreeService.getTree().then(({ data }) => data),
  staleTime: 5 * 60 * 1000
})

function toTreeNodes(nodes: OrgTreeNode[]): TreeNode[] {
  return nodes.map((n) => ({
    key: `${n.type}-${n.id}`,
    label: n.label,
    data: { type: n.type, id: n.id, jobTitle: n.jobTitle },
    children: n.children ? toTreeNodes(n.children) : undefined,
    leaf: !n.children || n.children.length === 0
  }))
}

const treeNodes = computed<TreeNode[]>(() => (data.value ? toTreeNodes(data.value) : []))

function collectKeys(nodes: TreeNode[]): Record<string, boolean> {
  const keys: Record<string, boolean> = {}
  for (const n of nodes) {
    if (n.children && n.children.length > 0) {
      keys[n.key as string] = true
      Object.assign(keys, collectKeys(n.children))
    }
  }
  return keys
}

const expandedKeys = ref<Record<string, boolean>>({})

watch(
  treeNodes,
  (nodes) => {
    if (nodes.length > 0) {
      expandedKeys.value = collectKeys(nodes)
    }
  },
  { once: true }
)

function onNodeSelect(node: TreeNode) {
  const { type, id } = node.data as { type: 'dept' | 'user'; id: string }
  if (type === 'dept') {
    router.push({ name: 'org-dept-detail', params: { deptId: id } })
  } else {
    router.push({ name: 'org-user-detail', params: { userId: id } })
  }
}
</script>
<template>
  <BasePage>
    <h1>{{ $t('Org.OrgTree') }}</h1>
    <Card class="mt-4">
      <template #content>
        <div v-if="isFetching" class="text-muted-color py-4 text-center">
          <font-awesome-icon icon="fa-solid fa-spinner" spin />
        </div>
        <Tree
          v-else
          :value="treeNodes"
          v-model:expandedKeys="expandedKeys"
          selectionMode="single"
          @node-select="onNodeSelect"
          class="w-full"
        >
          <template #default="{ node }">
            <div class="flex items-center gap-2">
              <font-awesome-icon
                v-if="node.data.type === 'dept'"
                icon="fa-solid fa-building"
                class="text-primary"
              />
              <font-awesome-icon v-else icon="fa-solid fa-user" class="text-neutral-500" />
              <span>{{ node.label }}</span>
              <span v-if="node.data.jobTitle" class="text-muted-color text-sm">
                {{ node.data.jobTitle }}
              </span>
            </div>
          </template>
        </Tree>
      </template>
    </Card>
  </BasePage>
</template>
