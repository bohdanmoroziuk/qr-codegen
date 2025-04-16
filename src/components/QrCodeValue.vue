<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { set } from '@vueuse/core'

const value = defineModel<string>('value', { default: '' })

const tab = ref('url')

const tabs = ref<TabsItem[]>([
  {
    label: 'URL',
    icon: 'i-lucide-earth',
    value: 'url',
    slot: 'url',
  },
  {
    label: 'Email',
    icon: 'i-lucide-mail',
    value: 'email',
    slot: 'email',
  },
  {
    label: 'SMS',
    icon: 'i-lucide-message-circle-more',
    value: 'sms',
    slot: 'sms',
  },
])

const resetValue = () => {
  set(value, '')
}

watch(tab, resetValue)
</script>

<template>
  <div>
    <UTabs
      v-model="tab"
      :items="tabs"
      size="sm"
      class="gap-4 w-full"
    >
      <template #url>
        <QrCodeValueUrl v-model:url="value" />
      </template>

      <template #email>
        <QrCodeValueEmail v-model:email="value" />
      </template>

      <template #sms>
        <QrCodeValueSms v-model:sms="value" />
      </template>
    </UTabs>
  </div>
</template>
