<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

withDefaults(
  defineProps<{
    type?: InputTypeHTMLAttribute
    modelValue: string | number | null
    placeholder?: string
    disabled?: boolean
    error?: boolean
  }>(),
  {
    type: 'text',
    disabled: false,
  },
)

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="flex px-4 py-3 border-2 border-gray-800 rounded-lg bg-transparent text-darken font-medium disabled:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-0"
    />
    <span v-if="error" class="absolute -bottom-1.5 right-3 px-2 bg-gray-800 text-xs text-error"
      >Preencha este campo</span
    >
  </div>
</template>
