<script setup lang="ts">
import FileUpload from './FileUpload.vue'
import { FormFieldModeEnum } from '@/libs/enums/FormTypes'
import type { FileModel } from '@/libs/models/File/File'
import { fileService } from '@/libs/services/fileService'
import Button from 'primevue/button'
import Image from 'primevue/image'
import { ref } from 'vue'

interface Props {
  groupId: string
  mode?: FormFieldModeEnum
  multiple?: boolean
}

const props = defineProps<Props>()
const list = ref<FileModel[]>([])

fileService.list(props.groupId).then((response) => {
  list.value.push(...response)
})

const remove = (file: FileModel) => {
  file.isDeleted = true
}

const upload = (files: FileModel[]) => {
  if (!props.multiple) {
    list.value.forEach((file) => {
      remove(file)
    })
  }

  list.value.push(...files)
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <FileUpload
      v-if="mode == FormFieldModeEnum.required || mode == FormFieldModeEnum.optional"
      accept="image/*"
      :groupId="groupId"
      :multiple="multiple"
      @upload="upload"
    />
    <div class="flex flex-col gap-1">
      <template v-for="file in list" :key="file.id">
        <div v-if="!file.isDeleted" class="flex gap-1">
          <Image :src="file.url" class="w-[100px] h-[100px]" preview />
          <Button
            v-if="mode == FormFieldModeEnum.required || mode == FormFieldModeEnum.optional"
            class="shrink-0"
            icon="pi pi-trash"
            rounded
            severity="secondary"
            @click="remove(file)"
            v-tooltip="$t('Action.Remove')"
          />
        </div>
      </template>
    </div>
  </div>
</template>
