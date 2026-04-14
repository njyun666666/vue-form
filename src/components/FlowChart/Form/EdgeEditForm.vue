<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useClipboard } from '@vueuse/core'
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import { useForm } from 'vee-validate'
import { type Ref, inject, onMounted, ref } from 'vue'
import * as z from 'zod'

const emit = defineEmits<{
  save: [action: (e?: Event) => Promise<Promise<void> | undefined>]
  dataSend: [data: { label: string }]
}>()

const { copy, copied } = useClipboard()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')!
const edgeId = ref('')

const schema = z.object({ label: z.string() })

const form = useForm({ validationSchema: toTypedSchema(schema) })
const { defineField, handleSubmit } = form
const [label] = defineField('label')

const onSubmit = handleSubmit(async (values) => {
  emit('dataSend', values)
})

onMounted(() => {
  const data = dialogRef.value.data
  edgeId.value = data.id
  form.setValues({ label: data.label })
  emit('save', onSubmit)
})

defineExpose({ onSubmit })
</script>
<template>
  <form novalidate @submit="onSubmit">
    <div class="space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <InputField class="col-span-full" for="edgeId" :label="$t('Flow.Edge.edgeId')">
          <InputGroup>
            <InputText id="edgeId" type="text" :value="edgeId" :disabled="true" />
            <InputGroupAddon class="p-0">
              <Button
                :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
                severity="secondary"
                variant="text"
                v-tooltip="$t('Action.Copy')"
                @click="copy(edgeId)"
              />
            </InputGroupAddon>
          </InputGroup>
        </InputField>
      </div>

      <div class="grid grid-cols-12 gap-5">
        <InputField class="col-span-full" for="edgeLabel" :label="$t('Flow.Edge.label')">
          <InputText id="edgeLabel" type="text" v-model.trim="label" />
        </InputField>
      </div>
    </div>
  </form>
</template>
