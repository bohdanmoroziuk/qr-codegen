<script setup lang="ts">
import { set } from '@vueuse/core'

const email = defineModel<string>('email', { default: '' })

const model = ref<MailtoData>({
  email: '',
  subject: '',
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
  set(model, parseMailtoLink(link))
}

const setEmail = (data: MailtoData) => {
  set(email, createMailtoLink(data))
}

watch(email, setModel, { immediate: true })

watch(model, setEmail, { deep: true })
</script>

<template>
  <div class="flex flex-col gap-4">
    <UFormField
      :ui="ui.field"
      label="Email"
    >
      <UInput
        v-model.trim.lazy="model.email"
        :ui="ui.input"
        placeholder="name@mail.com"
        type="email"
      />
    </UFormField>

    <UFormField
      :ui="ui.field"
      label="Subject"
    >
      <UInput
        v-model.trim.lazy="model.subject"
        :ui="ui.input"
        type="text"
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
