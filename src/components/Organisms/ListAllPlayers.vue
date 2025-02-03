<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { usePlayersStore } from '@/stores/players'
import { usePlayer } from '@/composables/usePlayer'
import BaseDataTable from '@/components/Molecules/BaseDataTable.vue'
import type { IColumn } from '@/models/table'
import type { IPlayer } from '@/models/player'

const { players, setPlayers, removePlayer, setFavoritePlayer } = usePlayersStore()
const { fetchData, isLoading, isRemoving } = usePlayer()

const dataPlayers = ref<IPlayer[]>(players)

const columns = ref<IColumn[]>([
  { label: 'Name', field: 'full_name', sortable: true },
  { label: 'Country', field: 'country', sortable: true },
  { label: 'Team', field: 'team.full_name', sortable: true },
  { label: 'Position', field: 'position', sortable: true },
])

const handleDelete = async (playerId: number) => {
  const response = await removePlayer(playerId)
  dataPlayers.value = response
}

onMounted(async () => {
  if (dataPlayers.value.length === 0) {
    const response = await fetchData()
    if (response) dataPlayers.value = response
  }
})

watch(
  dataPlayers,
  (newPlayers) => {
    setPlayers([...newPlayers])
  },
  { deep: true },
)
</script>

<template>
  <div class="pb-4 px-4 rounded-md w-full">
    <div class="overflow-x-auto mt-6">
      <BaseDataTable
        :data="dataPlayers"
        :columns="columns"
        :onFavorite="setFavoritePlayer"
        :onDelete="handleDelete"
        :isLoading="isLoading"
        :isRemoving="isRemoving"
      />
    </div>
  </div>
</template>
