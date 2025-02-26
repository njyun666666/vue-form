<script setup lang="ts">
import type { FileModel } from '@/libs/models/File/File'
import { fileService } from '@/libs/services/fileService'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'

interface Props {
  accept?: string
  multiple?: boolean
  groupId: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  upload: [files: FileModel[]]
}>()

const onFileSelect = async (e: FileUploadSelectEvent) => {
  const response = await fileService.upload(e.files, props.groupId)
  emit('upload', response)
}
</script>
<template>
  <FileUpload
    mode="basic"
    name="files[]"
    :accept="accept"
    :maxFileSize="1000000"
    @select="onFileSelect"
    customUpload
    auto
    :multiple="multiple"
    :chooseLabel="$t('Action.UploadFile')"
    :groupId="groupId"
  ></FileUpload>
</template>
