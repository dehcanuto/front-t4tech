<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayersStore } from '@/stores/players'
import { usePlayer } from '@/composables/usePlayer'
import BaseDataTable from '@/components/Molecules/BaseDataTable.vue'
import type { IColumn } from '@/models/table'

const playerStore = usePlayersStore()
const { players, fetchData, confirmDelete, isLoading, isRemoving } = usePlayer()

const columns = ref<IColumn[]>([
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
        :onFavorite="playerStore.setFavoritePlayer"
        :onDelete="confirmDelete"
        :isLoading="isLoading"
        :isRemoving="isRemoving"
      />
    </div>
  </div>
</template>
