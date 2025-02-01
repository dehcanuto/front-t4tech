<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseHeader from './components/BaseHeader.vue'
</script>

<template>
  <div class="bg-gray-900">
    <BaseHeader />
    <RouterView />
  </div>
</template>
