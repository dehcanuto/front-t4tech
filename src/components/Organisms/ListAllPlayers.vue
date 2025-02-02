<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayersStore } from '@/stores/players'
import { usePlayerStore } from '@/composables/usePlayerStore'
import BaseDataTable from '@/components/Molecules/BaseDataTable.vue'

const playerStore = usePlayersStore()
const { players, search, fetchData, sortPlayers, confirmDelete, isLoading } = usePlayerStore()

const columns = ref([
  { label: 'Name', field: 'full_name', sortable: true },
  { label: 'Country', field: 'country', sortable: true },
  { label: 'Team', field: 'team.full_name', sortable: true },
  { label: 'Position', field: 'position', sortable: true },
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
        :onFavorite="playerStore.setFavoritePlayer"
        :onDelete="confirmDelete"
        :isLoading="isLoading"
      />
    </div>
  </div>
</template>
