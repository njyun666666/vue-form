<script setup lang="ts">
import FileUpload from './FileUpload.vue'
import type { FileModel } from '@/libs/models/File/File'
import { fileService } from '@/libs/services/fileService'
import type { FormFieldModeType } from '@/libs/types/FormTypes'
import Button from 'primevue/button'
import { ref } from 'vue'

interface Props {
  groupId: string
  mode?: FormFieldModeType
}

const props = defineProps<Props>()
const list = ref<FileModel[]>([])

fileService.list(props.groupId).then((response) => {
  list.value.push(...response)
})

const remove = (file: FileModel) => {
  file.isDeleted = true
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <FileUpload
      v-if="mode == 'required' || mode == 'optional'"
      accept="image/*"
      :groupId="groupId"
      @upload="(files) => list.push(...files)"
    />
    <div class="flex flex-col gap-1">
      <div v-for="file in list" :key="file.id" class="flex gap-1">
        <template v-if="!file.isDeleted">
          <img :src="file.url" class="w-[100px] h-[100px]" />
          <Button
            v-if="mode == 'required' || mode == 'optional'"
            icon="pi pi-trash"
            rounded
            severity="secondary"
            @click="remove(file)"
            v-tooltip="$t('Action.Remove')"
          />
        </template>
      </div>
    </div>
  </div>
</template>
