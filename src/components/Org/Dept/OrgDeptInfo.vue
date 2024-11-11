<script setup lang="ts">
import type { OrgDept } from '@/libs/models/OrgDept/OrgDept'
import { orgDeptService } from '@/libs/services/orgDeptService'
import Card from 'primevue/card'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const deptId = ref(route.params['deptId'] as string)
const data = ref<OrgDept>()
orgDeptService.getOrgDept(deptId.value).then((res) => (data.value = res.data))
</script>
<template>
  <Card>
    <template #title>{{ data?.deptName }}</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
      </p>
    </template>
  </Card>
</template>
