<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeftIcon, FingerPrintIcon, UsersIcon } from '@heroicons/vue/24/outline'

import { resolveNestedValue } from '@/utils/nestedValues'
import { usePlayersStore } from '@/stores/players'
import { usePlayer } from '@/composables/usePlayer'
import type { IPlayer, IPlayerEditForm } from '@/models/player'

import BaseLoadingIcon from '@/components/Atoms/BaseLoadingIcon.vue'
import BaseCard from '@/components/Atoms/BaseCard.vue'
import FavoriteButton from '@/components/Molecules/FavoriteButton.vue'
import FormField from '@/components/Molecules/FormField.vue'
import SkeletonSinglePlayer from '@/components/Skeletons/SinglePlayer.vue'

const route = useRoute()
const { updatePlayer } = usePlayersStore()
const { getPlayer, isLoading, isSaving } = usePlayer()

const player = ref<IPlayer | null>(null)
const playerForm = ref<HTMLFormElement | null>(null)

const form = reactive<IPlayerEditForm>({
  first_name: '',
  last_name: '',
  country: '',
  height: '',
  weight: '',
  position: '',
  jersey_number: '',
  college: '',
  draft_year: null,
  draft_round: null,
  draft_number: null,
})

const submitForm = () => {
  if (playerForm.value) {
    playerForm.value.requestSubmit()
  }
}

const fetchPlayer = async () => {
  const res: IPlayer | undefined = await getPlayer(route.params.id as string)

  if (!res) return

  player.value = res

  form.first_name = res.first_name
  form.last_name = res.last_name
  form.country = res.country
  form.height = res.height
  form.weight = res.weight
  form.position = res.position
  form.jersey_number = res.jersey_number
  form.college = res.college
  form.draft_year = res.draft_year ?? null
  form.draft_round = res.draft_round ?? null
  form.draft_number = res.draft_number ?? null
}

const handleSubmit = async () => {
  await updatePlayer(form)
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
          <BaseLoadingIcon />
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
          <FormField label="First Name" v-model="form.first_name" />
          <FormField label="Last Name" v-model="form.last_name" />
          <FormField label="Country" v-model="form.country" />
          <FormField label="Height" v-model="form.height" />
          <FormField label="Weight" v-model="form.weight" />
          <FormField label="Position" v-model="form.position" />
          <FormField
            label="Jersey Number"
            v-model="form.jersey_number"
            placeholder="Jersey Number"
          />
          <FormField label="College" v-model="form.college" />
          <FormField label="Draft Year" v-model="form.draft_year" />
          <FormField label="Draft Round" v-model="form.draft_round" />
          <FormField label="Draft Number" v-model="form.draft_number" />
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
