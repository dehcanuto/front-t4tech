<script setup lang="ts">
import { ref } from 'vue'
import { usePlayersStore } from '@/stores/players'
import BaseDataTable from '@/components/Molecules/BaseDataTable.vue'
import { usePlayer } from '@/composables/usePlayer'
import type { IColumn } from '@/models/table'

const { removePlayer } = usePlayer()
const playerStore = usePlayersStore()

const columns = ref<IColumn[]>([
  { label: 'Name', field: 'full_name', sortable: true },
  { label: 'Country', field: 'country', sortable: true },
  { label: 'Team', field: 'team.full_name', sortable: true },
  { label: 'Position', field: 'position', sortable: true },
])
</script>

<template>
  <div class="pb-4 px-4 rounded-md w-full">
    <div class="overflow-x-auto mt-6">
      <BaseDataTable
        :data="playerStore.favorites"
        :columns="columns"
        :onFavorite="playerStore.setFavoritePlayer"
        :onDelete="removePlayer"
        :isLoading="playerStore.isLoading"
      />
    </div>
  </div>
</template>
