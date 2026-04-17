<script setup lang="ts">
import { appConst } from '@/appConst'
import type { OptionGroupModel, OptionModel } from '@/libs/models/Query/OptionModel'
import { optionService } from '@/libs/services/optionService'
import { cn } from '@/libs/utils/style'
import { useQuery } from '@tanstack/vue-query'
import { refDebounced } from '@vueuse/core'
import MultiSelect from 'primevue/multiselect'
import { computed, ref, useAttrs, watch } from 'vue'
import type { HTMLAttributes } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  user?: boolean
  dept?: boolean
  role?: boolean
  multiple?: boolean
  class?: HTMLAttributes['class']
}>()

const modelValue = defineModel<string | string[] | null>()
const id = defineModel<string>('id')
const name = defineModel<string>('name')

const emit = defineEmits<{
  objectChange: [value: OptionModel<string> | OptionModel<string>[]]
}>()

const { t } = useI18n()
const attrs = useAttrs()

const filterInput = ref('')
const debouncedFilter = refDebounced(filterInput, 1000)

// 記住初始選中的 ID，用於無搜尋字時解析既有值的 label（只在初次使用）
const initValues = ref<string[]>([])

// 快取所有曾選中項目的 option 物件
const selectedOptionsMap = ref(new Map<string, OptionModel<string>>())

// 共用查詢參數：有搜尋字用 input，否則用 initValues（僅初始解析既有值 label 用）
const queryParams = computed(() =>
  debouncedFilter.value ? { input: debouncedFilter.value } : { initValues: initValues.value }
)
const hasQuery = computed(() => !!debouncedFilter.value || initValues.value.length > 0)

const { data: userOptions, isFetching: userLoading } = useQuery({
  queryKey: [optionService.userUrl, queryParams],
  queryFn: () => optionService.user(queryParams.value).then(({ data }) => data),
  enabled: () => !!props.user && hasQuery.value,
  staleTime: appConst.StaleTime
})

const { data: deptOptions, isFetching: deptLoading } = useQuery({
  queryKey: [optionService.deptUrl, queryParams],
  queryFn: () => optionService.dept(queryParams.value).then(({ data }) => data),
  enabled: () => !!props.dept && hasQuery.value,
  staleTime: 1000 //appConst.StaleTime
})

const { data: roleOptions, isFetching: roleLoading } = useQuery({
  queryKey: [optionService.roleUrl, queryParams],
  queryFn: () => optionService.role(queryParams.value).then(({ data }) => data),
  enabled: () => !!props.role && hasQuery.value,
  staleTime: appConst.StaleTime
})

// 任一 options 更新時，把已選中且尚未快取的項目存入 map
watch([userOptions, deptOptions, roleOptions], () => {
  const allItems = [
    ...(userOptions.value ?? []),
    ...(deptOptions.value ?? []),
    ...(roleOptions.value ?? [])
  ]
  const map = new Map(selectedOptionsMap.value)
  internalSelected.value.forEach((id) => {
    if (!map.has(id)) {
      const opt = allItems.find((o) => o.value === id)
      if (opt) map.set(id, opt)
    }
  })
  selectedOptionsMap.value = map
})

const isLoading = computed(() => userLoading.value || deptLoading.value || roleLoading.value)

const groupedOptions = computed<OptionGroupModel<string>[]>(() => {
  // 無搜尋字時只顯示已選擇 group
  if (!debouncedFilter.value) {
    const selectedItems = internalSelected.value
      .map((id) => selectedOptionsMap.value.get(id))
      .filter(Boolean) as OptionModel<string>[]
    return selectedItems.length > 0 ? [{ label: t('Org.Selected'), items: selectedItems }] : []
  }

  const searchGroups: OptionGroupModel<string>[] = []
  if (props.user && userOptions.value?.length)
    searchGroups.push({ label: t('Org.User'), items: userOptions.value })
  if (props.dept && deptOptions.value?.length)
    searchGroups.push({ label: t('Org.Dept'), items: deptOptions.value })
  if (props.role && roleOptions.value?.length)
    searchGroups.push({ label: t('Org.Role'), items: roleOptions.value })

  // 已選項目不在搜尋結果中 → 補上「已選擇」group
  const searchValues = new Set(searchGroups.flatMap((g) => g.items.map((o) => o.value)))
  const missingSelected = internalSelected.value
    .filter((id) => !searchValues.has(id))
    .map((id) => selectedOptionsMap.value.get(id))
    .filter(Boolean) as OptionModel<string>[]

  if (missingSelected.length > 0)
    return [{ label: t('Org.Selected'), items: missingSelected }, ...searchGroups]

  return searchGroups
})

const computedSelectionLimit = computed(() =>
  !props.multiple ? 1 : (attrs['selectionLimit'] as number | undefined)
)

const internalSelected = ref<string[]>([])

watch(
  () => modelValue.value,
  (val) => {
    const ids = props.multiple ? ((val as string[]) ?? []) : val ? [val as string] : []
    internalSelected.value = ids
    if (ids.length > 0 && initValues.value.length === 0) {
      initValues.value = ids
    }
  },
  { immediate: true }
)

function onSelectionChange(val: string[]) {
  // 維護 selectedOptionsMap：選取時加入，取消時移出
  const allItems = groupedOptions.value.flatMap((g) => g.items)
  const map = new Map<string, OptionModel<string>>()
  val.forEach((v) => {
    const opt = selectedOptionsMap.value.get(v) ?? allItems.find((o) => o.value === v)
    if (opt) map.set(v, opt)
  })
  selectedOptionsMap.value = map

  internalSelected.value = val
  const selected = val
    .map((v) => selectedOptionsMap.value.get(v))
    .filter(Boolean) as OptionModel<string>[]

  modelValue.value = props.multiple ? val : (val[0] ?? '')
  id.value = selected.map((o) => o.value).join(',')
  name.value = selected.map((o) => o.label).join(',')
  emit('objectChange', props.multiple ? selected : selected[0])
}
</script>

<template>
  <MultiSelect
    v-bind="$attrs"
    v-model="internalSelected"
    :options="groupedOptions"
    optionGroupLabel="label"
    optionGroupChildren="items"
    optionLabel="label"
    optionValue="value"
    :selectionLimit="computedSelectionLimit"
    :loading="isLoading"
    filter
    display="chip"
    :class="cn('w-full', props.class)"
    @filter="(e) => (filterInput = e.value)"
    @update:modelValue="onSelectionChange"
  />
</template>
