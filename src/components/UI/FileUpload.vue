<script setup lang="ts">
import type { FileModel } from '@/libs/models/File/File'
import { fileService } from '@/libs/services/fileService'
import FileUpload, { type FileUploadUploaderEvent } from 'primevue/fileupload'
import { ref } from 'vue'

interface Props {
  accept?: string
  multiple?: boolean
  groupId: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  upload: [files: FileModel[]]
}>()

const uploading = ref(false)

const onUploader = async (e: FileUploadUploaderEvent) => {
  uploading.value = true
  const response = await fileService.upload(e.files, props.groupId)
  emit('upload', response)
  uploading.value = false
}
</script>
<template>
  <FileUpload
    mode="basic"
    name="files[]"
    :accept="accept"
    :maxFileSize="1000000"
    @uploader="onUploader"
    customUpload
    auto
    :multiple="multiple"
    :chooseIcon="uploading ? 'pi pi-spin pi-spinner' : 'pi pi-plus'"
    :chooseLabel="$t('Action.UploadFile')"
    :groupId="groupId"
    :pt="{ root: 'justify-start' }"
  ></FileUpload>
</template>
