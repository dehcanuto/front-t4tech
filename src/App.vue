<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseHeader from './components/BaseHeader.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900">
    <BaseHeader />
    <div class="flex flex-col h-full items-center">
      <RouterView />
    </div>
  </div>
</template>
