<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import QrCodeRenderer from 'qrcode.vue'

const content = ref(location.href)
const foreground = ref('#000000')
const background = ref('#ffffff')

const items = ref<AccordionItem[]>([
  {
    label: 'Content',
    icon: 'i-lucide-earth',
    slot: 'content',
  },
  {
    label: 'Colors',
    icon: 'i-lucide-brush',
    slot: 'colors',
  },
])

const ui = {
  card: {
    root: 'bg-[#e8eef2] shadow-[0_0_20px_rgba(0,0,0,0.25)]',
    body: 'p-0 sm:p-0',
  },
  field: {
    root: 'flex-1',
  },
  input: {
    root: 'w-full',
  },
}
</script>

<template>
  <div class="max-w-5xl w-full mx-6">
    <UCard :ui="ui.card">
      <template #header>
        <h1 class="text-2xl text-center font-bold">
          QR Code Generator
        </h1>
      </template>

      <template #default>
        <div class="flex">
          <div class="flex-1 p-8">
            <UAccordion
              :default-value="['0']"
              :items="items"
              type="multiple"
            >
              <template #content-body>
                <UFormField
                  :ui="ui.field"
                  label="URL"
                >
                  <UInput
                    v-model.trim.lazy="content"
                    :ui="ui.input"
                    placeholder="http://"
                    type="url"
                  />
                </UFormField>
              </template>

              <template #colors-body>
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
            </UAccordion>
          </div>
          <div class="flex items-center justify-center p-8 bg-white">
            <QrCodeRenderer
              :value="content"
              :size="256"
              :foreground="foreground"
              :background="background"
            />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
