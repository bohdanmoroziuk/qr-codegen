<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import QrCodeRenderer from 'qrcode.vue'
import { toPng, toSvg } from 'html-to-image'
import { saveAs } from 'file-saver'

const useLogo = () => {
  const { open, reset, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
  })

  const logo = ref<string | undefined>(undefined)

  const imageSettings = computed(() => {
    if (logo.value == undefined) return undefined

    return {
      src: logo.value,
      width: 96,
      height: 96,
      excavate: true,
    }
  })

  const setLogo = async (files: FileList | null) => {
    if (files == null) return
    if (files.length == 0) return

    logo.value = await fileToDataUrl(files[0])
  }

  const selectLogo = () => {
    open()
  }

  const removeLogo = () => {
    reset()
    logo.value = undefined
  }

  onChange(setLogo)

  return {
    logo,
    imageSettings,
    selectLogo,
    removeLogo,
  }
}

const Size = {
  XS: 50,
  SM: 125,
  MD: 200,
  LG: 256,
}

const toast = useToast()
const qrCode = useTemplateRef<HTMLElement>('qr-code')
const content = ref(location.href)
const foreground = ref('#000000')
const background = ref('#ffffff')
const size = ref(Size.LG)
const { logo, imageSettings, selectLogo, removeLogo } = useLogo()

const setSize = (value: number) => {
  size.value = value
}

const downloadQrCode = async (format: 'png' | 'svg') => {
  if (qrCode.value == null) return

  const toDataUrl = format === 'png' ? toPng : toSvg
  const name = format === 'png' ? 'qr-code.png' : 'qr-code.svg'

  try {
    const dataUrl = await toDataUrl(qrCode.value)

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
    slot: 'content',
  },
  {
    label: 'Colors',
    icon: 'i-lucide-brush',
    slot: 'colors',
  },
  // {
  //   label: 'Size',
  //   icon: 'i-lucide-square-dashed-mouse-pointer',
  //   slot: 'size',
  // },
  {
    label: 'Logo',
    icon: 'i-lucide-image',
    slot: 'logo',
  },
])

const ui = {
  card: {
    root: 'bg-[#e8eef2] shadow-[0_0_20px_rgba(0,0,0,0.25)] overflow-hidden',
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

              <template #size-body>
                <p class="text-center">
                  {{ size }} x {{ size }}
                </p>
                <div class="px-1 py-4">
                  <USlider
                    v-model="size"
                    :min="Size.XS"
                    :max="Size.LG"
                  />
                </div>
                <div class="flex gap-x-2">
                  <UButton
                    size="sm"
                    color="error"
                    block
                    @click="setSize(Size.XS)"
                  >
                    xs
                  </UButton>
                  <UButton
                    size="sm"
                    color="warning"
                    block
                    @click="setSize(Size.SM)"
                  >
                    sm
                  </UButton>
                  <UButton
                    size="sm"
                    color="info"
                    block
                    @click="setSize(Size.MD)"
                  >
                    md
                  </UButton>
                  <UButton
                    size="sm"
                    block
                    @click="setSize(Size.LG)"
                  >
                    lg
                  </UButton>
                </div>
              </template>

              <template #logo>
                <div class="flex items-start gap-x-4">
                  <img
                    v-if="logo"
                    :src="logo"
                    class="w-24 h-24"
                    alt="logo"
                  >
                  <div
                    v-else
                    class="bg-white w-24 h-24 p-2"
                  >
                    <div class="flex items-center justify-center h-full border-2 border-dashed border-gray-400">
                      No logo
                    </div>
                  </div>
                  <div class="flex flex-col gap-y-4">
                    <UButton @click="selectLogo">
                      Upload image
                    </UButton>
                    <UButton
                      v-if="logo"
                      variant="outline"
                      color="secondary"
                      @click="removeLogo"
                    >
                      Remove logo
                    </UButton>
                  </div>
                </div>
              </template>
            </UAccordion>
          </div>
          <div class="flex flex-col p-8 bg-white">
            <div
              ref="qr-code"
              class="flex items-center justify-center w-64 h-64"
            >
              <QrCodeRenderer
                :value="content"
                :foreground="foreground"
                :background="background"
                :size="size"
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
