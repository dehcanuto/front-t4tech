<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex flex-col animate-pulse gap-8">
    <div class="flex items-center gap-4">
      <ChevronLeftIcon class="size-6" />
      <span class="flex w-36 h-5 bg-gray-700 rounded"></span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="item in [1, 2]"
        :key="item"
        class="flex flex-col p-4 h-fit border-2 border-gray-800 gap-4 rounded"
      >
        <div v-for="item in [1, 2, 3, 4, 5]" :key="item" class="flex items-center gap-3">
          <span class="flex w-16 h-4 bg-gray-700 rounded"></span>
          <span class="flex w-40 h-4 bg-gray-700 rounded"></span>
        </div>
      </div>
    </div>
  </div>
</template>
