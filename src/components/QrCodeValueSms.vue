<script setup lang="ts">
import { set } from '@vueuse/core'

const sms = defineModel<string>('sms', { default: '' })

const model = ref<SmsData>({
  phone: '',
  body: '',
})

const ui = {
  field: {
    root: 'flex-1',
  },
  input: {
    root: 'w-full',
  },
}

const setModel = (link: string) => {
  set(model, parseSmsLink(link))
}

const setSms = (data: SmsData) => {
  set(sms, createSmsLink(data))
}

watch(sms, setModel, { immediate: true })

watch(model, setSms, { deep: true })
</script>

<template>
  <div class="flex flex-col gap-4">
    <p>
      {{ sms }}
    </p>

    <UFormField
      :ui="ui.field"
      label="Phone Number"
    >
      <UInput
        v-model.trim.lazy="model.phone"
        :ui="ui.input"
        type="tel"
      />
    </UFormField>

    <UFormField
      :ui="ui.field"
      label="Message"
    >
      <UTextarea
        v-model.trim.lazy="model.body"
        :ui="ui.input"
        autoresize
      />
    </UFormField>
  </div>
</template>
