<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import QrCodeVue from 'qrcode.vue'

const content = ref(location.href)

const items = ref<AccordionItem[]>([
  {
    label: 'Content',
    icon: 'i-lucide-earth',
    slot: 'content',
  },
])

const ui = {
  card: {
    root: 'bg-[#e8eef2] shadow-[0_0_20px_rgba(0,0,0,0.25)]',
    body: 'p-0 sm:p-0',
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
              :items
              type="multiple"
            >
              <template #content-body>
                <UFormField label="URL">
                  <UInput
                    v-model.trim.lazy="content"
                    :ui="ui.input"
                    placeholder="http://"
                    type="url"
                  />
                </UFormField>
              </template>
            </UAccordion>
          </div>
          <div class="flex items-center justify-center p-8 bg-white">
            <QrCodeVue
              :value="content"
              :size="256"
              level="H"
              render-as="svg"
            />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
