<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { StarIcon } from '@heroicons/vue/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid'

import { usePlayersStore } from '@/stores/players'
import type { IPlayer } from '@/models/player'

const playersStore = usePlayersStore()
const props = defineProps<{ player: IPlayer }>()
</script>

<template>
  <button
    @click="playersStore.setFavoritePlayer(props.player)"
    class="text-yellow-500 p-2 hover:bg-gray-800 rounded"
  >
    <SolidStarIcon v-if="playersStore.isFavorite(props.player)" class="size-4" />
    <StarIcon v-else class="size-4" />
  </button>
</template>
