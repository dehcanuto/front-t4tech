<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayerStore } from '@/composables/usePlayerStore'
import BaseDataTable from '@/components/BaseDataTable.vue'

const { players, search, fetchData, sortPlayers, confirmDelete, isLoading } = usePlayerStore()

const columns = ref([
  { label: 'Nome', field: 'full_name', sortable: true },
  { label: 'País', field: 'country', sortable: true },
  { label: 'Time', field: 'team.full_name', sortable: true },
  { label: 'Posição', field: 'position', sortable: true },
])

onMounted(fetchData)
</script>

<template>
  <div class="pb-4 px-4 rounded-md w-full">
    <div class="overflow-x-auto mt-6">
      <BaseDataTable
        :data="players"
        :columns="columns"
        :onSort="sortPlayers"
        :onDelete="confirmDelete"
        :isLoading="isLoading"
      />
    </div>
  </div>
</template>
