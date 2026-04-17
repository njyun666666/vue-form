<script setup lang="ts">
import FormActionTag from '@/components/Form/FormActionTag.vue'
import type { ApprovalHistoryItemModel } from '@/libs/models/Form/FormModel'
import { formService } from '@/libs/services/formService'
import { useQuery } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  formId: string
  flowSetting?: Record<string, unknown>
}

const props = defineProps<Props>()
const { t } = useI18n()
const visible = ref(false)

const { data: history, isFetching } = useQuery({
  queryKey: computed(() => [formService.approvalHistoryUrl, props.formId]),
  queryFn: () => formService.getApprovalHistory(props.formId).then(({ data }) => data),
  enabled: computed(() => !!props.formId),
  staleTime: 30 * 60 * 1000
})

const nodeMap = computed(() => {
  if (!props.flowSetting || !Array.isArray(props.flowSetting.nodes)) return {}
  return Object.fromEntries(
    (props.flowSetting.nodes as { id: string; data?: { label?: string } }[]).map((n) => [
      n.id,
      n.data?.label ?? n.id
    ])
  )
})

const rows = computed<(ApprovalHistoryItemModel & { stepLabel: string })[]>(() =>
  (history.value ?? []).map((item) => ({
    ...item,
    stepLabel: item.stepId ? (nodeMap.value[item.stepId] ?? item.stepId) : ''
  }))
)

defineExpose({ open: () => (visible.value = true) })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="$t('Form.ApprovalHistory.title')"
    modal
    :style="{ width: '60vw' }"
  >
    <DataTable :value="rows" :loading="isFetching" size="small">
      <Column field="stepLabel" :header="t('Form.ApprovalHistory.stepLabel')" />
      <Column field="approverName" :header="t('Form.ApprovalHistory.approverName')" />
      <Column field="result" :header="t('Form.ApprovalHistory.result')">
        <template #body="{ data }">
          <FormActionTag v-if="data.result" :result="data.result" />
        </template>
      </Column>
      <Column field="comment" :header="t('Form.ApprovalHistory.comment')" />
      <Column field="approvalTime" :header="t('Form.ApprovalHistory.approvalTime')">
        <template #body="{ data }">
          {{ data.approvalTime ? dayjs(data.approvalTime).format('YYYY/MM/DD HH:mm') : '' }}
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>
