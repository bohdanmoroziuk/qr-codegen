<script setup lang="ts">
const foreground = defineModel<string>('foreground', { required: true })
const background = defineModel<string>('background', { required: true })

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
  <div class="flex items-center gap-x-4">
    <UFormField
      :ui="ui.field"
      label="Foreground"
    >
      <UInput
        v-model.lazy="foreground"
        :ui="ui.input"
        type="color"
      />
    </UFormField>

    <UFormField
      :ui="ui.field"
      label="Background"
    >
      <UInput
        v-model.lazy="background"
        :ui="ui.input"
        type="color"
      />
    </UFormField>
  </div>
</template>
