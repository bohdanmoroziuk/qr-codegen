<script setup lang="ts">
const value = defineModel<string>('value', { default: '' })

const ui = {
  field: {
    root: 'flex-1',
  },
  input: {
    root: 'w-full',
  },
}
</script>

<template>
  <UFormField
    :ui="ui.field"
    label="URL"
  >
    <UInput
      v-model.trim.lazy="value"
      :ui="ui.input"
      placeholder="http://"
      type="url"
    />
  </UFormField>
</template>
