<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeftIcon, FingerPrintIcon, UsersIcon } from '@heroicons/vue/24/outline'

import { resolveNestedValue } from '@/utils/nestedValues'
import { usePlayerStore } from '@/composables/usePlayerStore'
import type { IPlayer } from '@/models/player'

import BaseCard from '@/components/Atoms/BaseCard.vue'
import FavoriteButton from '@/components/Molecules/FavoriteButton.vue'
import SkeletonSinglePlayer from '@/components/Skeletons/SinglePlayer.vue'

const route = useRoute()
const { getPlayer, isLoading } = usePlayerStore()

const player = ref<IPlayer | null>(null)

const fetchPlayer = async () => {
  player.value = await getPlayer(route.params.id)
}

onMounted(() => {
  fetchPlayer()
})
</script>

<template>
  <SkeletonSinglePlayer v-if="isLoading"></SkeletonSinglePlayer>
  <div v-if="player" class="flex flex-col gap-8">
    <div class="flex items-center gap-4">
      <RouterLink to="/">
        <ChevronLeftIcon class="size-6" />
      </RouterLink>
      <div class="flex items-center gap-2">
        <h1 v-if="player" class="text-2xl text-white">
          {{ resolveNestedValue(player, 'full_name') }}
        </h1>
        <FavoriteButton :player="player" />
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseCard>
        <div class="flex items-center mb-4 gap-2">
          <FingerPrintIcon class="size-6 text-primary"></FingerPrintIcon>
          <h2 class="text-lg font-bold text-white">Player infos</h2>
        </div>
        <ul class="list-card">
          <li><span>Name</span>: {{ resolveNestedValue(player, 'full_name') }}</li>
          <li><span>Country</span>: {{ player.country }}</li>
          <li><span>Height</span>: {{ player.height }}</li>
          <li><span>Weight</span>: {{ player.weight }}</li>
          <li><span>Position</span>: {{ player.position }}</li>
          <li><span>Jersey Number</span>: {{ player.jersey_number }}</li>
          <li><span>College</span>: {{ player.college }}</li>
          <li v-if="player.draft_year"><span>Draft Year</span>: {{ player.draft_year }}</li>
          <li v-if="player.draft_round"><span>Draft Round</span>: {{ player.draft_round }}</li>
          <li v-if="player.draft_number"><span>Draft Number</span>: {{ player.draft_number }}</li>
        </ul>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center mb-4 gap-2">
          <UsersIcon class="size-6 text-primary"></UsersIcon>
          <h2 class="text-lg font-bold text-white">Team</h2>
        </div>
        <ul class="list-card">
          <li><span>Name</span>: {{ player.team.full_name }}</li>
          <li><span>Abbreviation</span>: {{ player.team.abbreviation }}</li>
          <li><span>Conference</span>: {{ player.team.conference }}</li>
          <li><span>Division</span>: {{ player.team.division }}</li>
          <li><span>City</span>: {{ player.team.city }}</li>
        </ul>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-card {
  @apply flex flex-col gap-3;
  li {
    @apply flex;
    span {
      @apply text-white font-semibold;
    }
  }
}
</style>
