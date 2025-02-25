<script setup lang="ts">
import InputField from '@/components/UI/InputField.vue'
import type { ApprovalModel } from '@/libs/models/Form/FormModel'
import type { ActionDialogProps } from '@/libs/models/Form/Toolbar'
import { FormApprovalAction, type FormApprovalActionType } from '@/libs/types/FormTypes'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { type Ref, inject, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const dialogRef = inject<Ref<any>>('dialogRef')!
const props = ref<ActionDialogProps>()
const { t } = useI18n()
const comment = ref<string>()
const commentError = ref<string>()
const emit = defineEmits<{
  submit: [data: ApprovalModel]
}>()

const closeDialog = () => {
  dialogRef.value.close()
}

const update = (action: FormApprovalActionType) => {
  commentError.value = ''

  if (action == 'reject' && !comment.value) {
    commentError.value = t('Message.Required')
    return
  }

  emit('submit', { comment: comment.value })
  console.log('uuuuuuuuuuuuu', { comment: comment.value })
}

onMounted(() => {
  props.value = dialogRef.value.data as ActionDialogProps
})
</script>
<template>
  <div class="flex flex-col gap-5">
    <InputField
      class="col-span-full"
      for="title"
      :error="commentError"
      :isRequired="props?.action == 'reject'"
    >
      <Textarea v-model="comment" autoResize rows="5" class="w-full" :invalid="!!commentError" />
    </InputField>
    <div class="flex gap-5 justify-end">
      <Button
        :label="$t('Action.Cancel')"
        severity="secondary"
        variant="text"
        @click="closeDialog"
      />
      <Button
        v-if="props?.action == 'approve'"
        :label="$t('Action.Approve')"
        icon="pi pi-check"
        @click="update(FormApprovalAction.approve as FormApprovalActionType)"
      />
      <Button
        v-if="props?.action == 'reject'"
        :label="$t('Action.Reject')"
        icon="pi pi-times"
        severity="danger"
        @click="update(FormApprovalAction.reject as FormApprovalActionType)"
      />
    </div>
  </div>
</template>
