<script setup lang="ts">
const url = defineModel<string>('url', { default: '' })

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
      v-model.trim.lazy="url"
      :ui="ui.input"
      placeholder="http://"
      type="url"
    />
  </UFormField>
</template>
