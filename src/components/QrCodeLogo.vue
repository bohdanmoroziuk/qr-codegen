<script setup lang="ts">
import { set } from '@vueuse/core'

const toast = useToast()

const { open, reset, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
  reset: true,
})

const logo = defineModel<string | null>('logo', { default: null })

const selectLogo = () => {
  open()
  set(logo, null)
}

const removeLogo = () => {
  reset()
  set(logo, null)
}

const setLogo = async (files: FileList | null) => {
  if (files == null) return
  if (files.length == 0) return

  try {
    const dataUrl = await fileToDataUrl(files[0])

    set(logo, dataUrl)
  }
  catch (error) {
    toast.add({
      title: 'Error',
      description: getErrorMessage(error, 'Could not convert image to data URL'),
      color: 'error',
    })
  }
}

onChange(setLogo)
</script>

<template>
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
