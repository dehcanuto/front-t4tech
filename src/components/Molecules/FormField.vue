<script setup lang="ts">
import BaseInputText from '@/components/Atoms/BaseInputText.vue'
import type { InputTypeHTMLAttribute } from 'vue'

defineProps<{
  label: string
  type?: InputTypeHTMLAttribute
  modelValue: string | number | null
  required?: boolean
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="relative flex flex-col text-left">
    <label
      class="absolute -top-1.5 left-4 px-3 bg-gray-900 font-bold text-xs text-slate-500 uppercase mb-2"
    >
      {{ label }} <span v-if="required" class="text-error ml-1">*</span>
    </label>
    <BaseInputText
      :modelValue="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>
