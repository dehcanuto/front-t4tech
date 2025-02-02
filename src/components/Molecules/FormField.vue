<script setup lang="ts">
import BaseInputText from '@/components/Atoms/BaseInputText.vue'

const props = defineProps<{
  label: string;
  type?: {
    type: string,
    default: 'text'
  }
  modelValue: string;
  required?: boolean;
  placeholder?: boolean;
}>()
</script>

<template>
  <div class="relative flex flex-col text-left">
    <label class="absolute -top-1.5 left-4 px-3 bg-gray-900 font-bold text-xs text-slate-500 uppercase mb-2">
        {{ label }} <span v-if="required" class="text-error ml-1">*</span>
    </label>
    <BaseInputText :modelValue="modelValue" :type="type" :placeholder="placeholder" />
    <span v-if="loading" class="absolute top-4 right-1 text-slate-500">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
  </div>
</template>
