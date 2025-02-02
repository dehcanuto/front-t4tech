<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ChevronUpDownIcon, PencilSquareIcon, TrashIcon, StarIcon } from '@heroicons/vue/24/outline'
import { resolveNestedValue } from '@/utils/nestedValues'
import FavoriteButton from '@/components/Molecules/FavoriteButton.vue'
import BaseModal from '@/components/Atoms/BaseModal.vue'

interface Column {
  label: string
  field: string
  sortable: boolean
}
const showModal = ref(false)
const selectedId = ref<number | null>(null)

const openModal = (id: number) => {
  selectedId.value = id
  showModal.value = true
}

const confirmDelete = async () => {
  if (selectedId.value !== null) {
    showModal.value = await props.onDelete(selectedId.value)
  }
}

const props = defineProps({
  data: {
    type: Array as () => any[],
    required: true,
  },
  columns: {
    type: Array as () => Column[],
    required: true,
  },
  onSort: {
    type: Function,
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
</script>

<template>
  <div class="p-4">
    <table
      class="table-auto border-collapse container w-full m-auto border-2 border-gray-800 shadow rounded"
    >
      <thead class="bg-gray-800 text-gray-400">
        <tr class="text-sm font-medium text-left" style="font-size: 0.9674rem">
          <th
            v-for="col in columns"
            :key="col.field"
            class="px-4 py-2 cursor-pointer"
            @click="col.sortable && onSort(col.field)"
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
        <template v-else-if="data && data.length > 0">
          <tr v-for="item in data" :key="item.id" class="border-b border-gray-800 py-10">
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
    <div
      id="pagination"
      class="w-full flex justify-center text-white border-t border-gray-800 pt-4 items-center"
    >
      <svg
        class="h-6 w-6"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7072C13.6834 17.0977 14.3166 17.0977 14.7071 16.7072C15.0977 16.3167 15.0977 15.6835 14.7071 15.293L11.4142 12L14.7071 8.70712C15.0977 8.31659 15.0977 7.68343 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z"
            fill="#2C2C2C"
          />
        </g>
      </svg>

      <p class="leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-600 text-sm">1</p>
      <p class="leading-relaxed cursor-pointer mx-2 text-sm hover:text-blue-600">2</p>
      <p class="leading-relaxed cursor-pointer mx-2 text-sm hover:text-blue-600">3</p>
      <p class="leading-relaxed cursor-pointer mx-2 text-sm hover:text-blue-600">4</p>
      <svg
        class="h-6 w-6"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 12C15 11.7348 14.8946 11.4804 14.7071 11.2929L10.7071 7.2929C10.3166 6.9024 9.6834 6.9024 9.2929 7.2929C8.9024 7.6834 8.9024 8.3166 9.2929 8.7071L12.5858 12L9.2929 15.2929C8.9024 15.6834 8.9024 16.3166 9.2929 16.7071C9.6834 17.0976 10.3166 17.0976 10.7071 16.7071L14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12Z"
          fill="#18A0FB"
        />
      </svg>
    </div>
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
          <span v-if="isRemoving">
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
          </span>
          <span v-else>Delete</span>
        </button>
      </div>
    </BaseModal>
  </div>
</template>
