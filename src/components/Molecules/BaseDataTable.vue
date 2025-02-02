<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ChevronUpDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { resolveNestedValue } from '@/utils/nestedValues'
import { filterData, sortDataValues } from '@/utils/playerTable'
import BasePagination from '@/components/Molecules/BasePagination.vue'
import FavoriteButton from '@/components/Molecules/FavoriteButton.vue'
import BaseModal from '@/components/Atoms/BaseModal.vue'
import BaseLoadingIcon from '@/components/Atoms/BaseLoadingIcon.vue'

import type { IPlayer } from '@/models/player'
import type { IColumn } from '@/models/table'

const props = defineProps({
  data: {
    type: Array as () => IPlayer[],
    required: true,
  },
  columns: {
    type: Array as () => IColumn[],
    required: true,
  },
  onFavorite: {
    type: Function,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isRemoving: {
    type: Boolean,
    default: false,
  },
})

const showModal = ref(false)
const selectedId = ref<number | null>(null)
const searchTerm = ref('')
const players = ref<IPlayer[]>(props.data)

const filteredData = computed(() => filterData(players.value, searchTerm.value))

const openModal = (id: number) => {
  selectedId.value = id
  showModal.value = true
}

const confirmDelete = async () => {
  if (selectedId.value !== null) {
    showModal.value = await props.onDelete(selectedId.value)
  }
}

const updatePlayers = (update: IPlayer[]) => {
  players.value = update
}

watch(
  () => props.data,
  (update) => {
    players.value = update
  },
  { immediate: true },
)
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search player by name, country, team and position..."
        class="w-full px-4 py-2 border border-gray-800 rounded bg-gray-900 text-white focus:outline-none"
      />
    </div>
    <table
      class="table-auto border-collapse container w-full m-auto border-2 border-gray-800 shadow rounded"
    >
      <thead class="bg-gray-800 text-gray-400">
        <tr class="text-sm font-medium text-left" style="font-size: 0.9674rem">
          <th
            v-for="col in columns"
            :key="col.field"
            class="px-4 py-2 cursor-pointer"
            @click="col.sortable && sortDataValues(col.field, data)"
          >
            <span class="flex items-center gap-2">
              {{ col.label }}
              <button v-if="col.sortable" type="button">
                <ChevronUpDownIcon class="size-4"></ChevronUpDownIcon>
              </button>
            </span>
          </th>
          <th class="px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody class="text-sm font-normal text-gray-700">
        <template v-if="isLoading">
          <tr
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
            :key="item"
            class="animate-pulse border-b border-gray-800 py-10"
          >
            <td v-for="col in columns" :key="col.field" class="px-4 py-4">
              <span class="flex h-4 w-32 bg-gray-700 rounded"></span>
            </td>
            <td class="flex px-4 py-4 gap-2">
              <span class="flex h-4 w-1/2 bg-gray-700 rounded"></span>
              <span class="flex h-4 w-1/2 bg-gray-700 rounded"></span>
            </td>
          </tr>
        </template>
        <template v-else-if="filteredData && filteredData.length > 0">
          <tr v-for="item in filteredData" :key="item.id" class="border-b border-gray-800 py-10">
            <td v-for="col in columns" :key="col.field" class="px-4 py-4 text-white">
              {{ resolveNestedValue(item, col.field) }}
            </td>
            <td class="px-4 py-4 flex items-center justify-center gap-1">
              <RouterLink
                :to="`/player/${item.id}`"
                class="text-blue-500 p-2 hover:bg-gray-800 rounded"
              >
                <PencilSquareIcon class="size-4" />
              </RouterLink>
              <button
                @click="openModal(item.id)"
                class="text-red-500 p-2 hover:bg-gray-800 rounded"
              >
                <TrashIcon class="size-4" />
              </button>
              <FavoriteButton :player="item" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="columns.length + 1" class="px-4 py-4 text-white text-center">
              No data available.
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <BasePagination @updatePlayers="updatePlayers" />
    <BaseModal v-if="showModal">
      <h2 class="text-lg text-white font-bold">Are you sure you want to delete?</h2>
      <p>This action will permanently remove the player.</p>
      <div class="flex justify-end mt-8 gap-2">
        <button
          @click="showModal = false"
          class="px-4 py-2 bg-gray-500 text-white font-bold uppercase rounded"
        >
          Cancel
        </button>
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-500 font-bold text-white uppercase rounded"
          :disabled="isLoading"
        >
          <BaseLoadingIcon v-if="isRemoving" />
          <span v-else>Delete</span>
        </button>
      </div>
    </BaseModal>
  </div>
</template>
