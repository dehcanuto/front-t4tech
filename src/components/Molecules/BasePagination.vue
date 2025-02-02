<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { usePlayer } from '@/composables/usePlayer'
import type { IPlayer } from '@/models/player'

const { fetchData } = usePlayer()

const nextCursor = ref<number>(0)

const emit = defineEmits<{
  (event: 'updatePlayers', player: IPlayer[]): void
}>()

const handlePage = async (page: number) => {
  nextCursor.value = page
  const response = await fetchData(page)
  if (response) emit('updatePlayers', response)
}
</script>
<template>
  <div
    id="pagination"
    class="w-full flex items-center justify-between text-white border-t border-gray-800 pt-4 items-center"
  >
    <button
      v-if="nextCursor > 0"
      type="button"
      @click="handlePage(nextCursor - 1)"
      class="flex items-center gap-2"
    >
      <ChevronLeftIcon class="size-4" />
      Back Page
    </button>
    <hr />
    <button type="button" @click="handlePage(nextCursor + 1)" class="flex items-center gap-2">
      Next Page
      <ChevronRightIcon class="size-4" />
    </button>
  </div>
</template>
