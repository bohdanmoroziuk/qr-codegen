<script setup lang="ts">
import { get } from '@vueuse/core'
import type { AccordionItem } from '@nuxt/ui'
import type { ImageSettings } from 'qrcode.vue'
import QrCodeRenderer from 'qrcode.vue'
import { toPng, toSvg } from 'html-to-image'
import { saveAs } from 'file-saver'

const toast = useToast()
const qrCode = useTemplateRef<HTMLElement>('qr-code')
const value = ref('')
const foreground = ref('#000000')
const background = ref('#ffffff')
const logo = ref<string | null>(null)

const imageSettings = computed<ImageSettings | undefined>(() => {
  if (get(logo) == null) {
    return undefined
  }

  return {
    src: get(logo)!,
    width: 96,
    height: 96,
    excavate: true,
  }
})

const downloadQrCode = async (format: 'png' | 'svg') => {
  if (get(qrCode) == null) return

  const toDataUrl = format === 'png' ? toPng : toSvg
  const name = format === 'png' ? 'qr-code.png' : 'qr-code.svg'

  try {
    const dataUrl = await toDataUrl(get(qrCode)!)

    saveAs(dataUrl, name)
  }
  catch (error) {
    toast.add({
      title: 'Error',
      description: getErrorMessage(error, 'Could not download image'),
      color: 'error',
    })
  }
}

const items = ref<AccordionItem[]>([
  {
    label: 'Content',
    icon: 'i-lucide-earth',
    slot: 'value',
  },
  {
    label: 'Colors',
    icon: 'i-lucide-brush',
    slot: 'colors',
  },
  {
    label: 'Logo',
    icon: 'i-lucide-image',
    slot: 'logo',
  },
])

const ui = {
  card: {
    root: 'bg-slate-200 shadow-xl overflow-hidden',
    body: 'p-0 sm:p-0',
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
        <div class="flex flex-col md:flex-row">
          <div class="flex-1 p-8">
            <UAccordion
              :default-value="['0']"
              :items="items"
              type="multiple"
            >
              <template #value>
                <QrCodeValueUrl v-model:value="value" />
              </template>

              <template #colors>
                <QrCodeColors
                  v-model:foreground="foreground"
                  v-model:background="background"
                />
              </template>

              <template #logo>
                <QrCodeLogo v-model:logo="logo" />
              </template>
            </UAccordion>
          </div>
          <div class="flex flex-col flex-1 md:flex-none items-center p-8 bg-white">
            <div
              ref="qr-code"
              class="flex items-center justify-center w-64 h-64"
            >
              <QrCodeRenderer
                :value="value"
                :foreground="foreground"
                :background="background"
                :size="256"
                :image-settings="imageSettings"
              />
            </div>
            <div class="flex items-center gap-x-4 mt-8">
              <UButton @click="downloadQrCode('png')">
                Download PNG
              </UButton>
              <UButton
                color="secondary"
                @click="downloadQrCode('svg')"
              >
                Download SVG
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
