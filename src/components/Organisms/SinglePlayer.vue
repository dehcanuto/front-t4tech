<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeftIcon, FingerPrintIcon, UsersIcon } from '@heroicons/vue/24/outline'

import { resolveNestedValue } from '@/utils/nestedValues'
import { usePlayerStore } from '@/composables/usePlayerStore'
import type { IPlayer } from '@/models/player'

import BaseCard from '@/components/Atoms/BaseCard.vue'
import FavoriteButton from '@/components/Molecules/FavoriteButton.vue'
import FormField from '@/components/Molecules/FormField.vue'
import SkeletonSinglePlayer from '@/components/Skeletons/SinglePlayer.vue'

const route = useRoute()
const { getPlayer, savePlayer, isLoading, isSaving } = usePlayerStore()

const player = ref<IPlayer | null>(null)
const playerForm = ref<HTMLFormElement | null>(null)

const form = reactive({
  first_name: '',
  last_name: '',
})

const submitForm = () => {
  if (playerForm.value) {
    playerForm.value.requestSubmit()
  }
}

const fetchPlayer = async () => {
  const res: IPlayer = await getPlayer(route.params.id)
  player.value = res

  form.first_name = res.first_name
  form.last_name = res.last_name
  form.country = res.country
  form.height = res.height
  form.weight = res.weight
  form.position = res.position
  form.jersey_number = res.jersey_number
  form.college = res.college
  form.draft_year = res.draft_year
  form.draft_round = res.draft_round
  form.draft_number = res.draft_number
}

const handleSubmit = () => {
  savePlayer(form)
}

onMounted(() => {
  fetchPlayer()
})
</script>

<template>
  <SkeletonSinglePlayer v-if="isLoading"></SkeletonSinglePlayer>
  <div v-if="player" class="flex flex-col gap-8">
    <div class="flex items-center justify-between">
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
      <button
        @click="submitForm"
        class="px-4 py-2 bg-blue-500 font-bold text-white uppercase rounded"
        :disabled="isSaving"
      >
        <span v-if="isSaving" class="flex items-center gap-3">
          <svg
            class="animate-spin m-auto h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Saving...
        </span>
        <span v-else>Save</span>
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseCard>
        <div class="flex items-center mb-4 gap-2">
          <FingerPrintIcon class="size-6 text-primary"></FingerPrintIcon>
          <h2 class="text-lg font-bold text-white">Player infos</h2>
        </div>
        <form @submit.prevent="handleSubmit" ref="playerForm" class="flex flex-col gap-4">
          <FormField label="First Name" v-model="form.first_name" placeholder="First Name" />
          <FormField label="Last Name" v-model="form.last_name" placeholder="Last Name" />
          <FormField label="Country" v-model="form.country" placeholder="Country" />
          <FormField label="Height" v-model="form.height" placeholder="Height" />
          <FormField label="Weight" v-model="form.weight" placeholder="Weight" />
          <FormField label="Position" v-model="form.position" placeholder="Position" />
          <FormField
            label="Jersey Number"
            v-model="form.jersey_number"
            placeholder="Jersey Number"
          />
          <FormField label="College" v-model="form.college" placeholder="College" />
          <FormField label="Draft Year" v-model="form.draft_year" placeholder="Draft Year" />
          <FormField label="Draft Round" v-model="form.draft_round" placeholder="Draft Round" />
          <FormField label="Draft Number" v-model="form.draft_number" placeholder="Draft Number" />
        </form>
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
}
</style>
