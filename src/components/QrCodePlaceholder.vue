<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center w-64 h-64 p-2 border-2 border-dashed border-gray-400 text-center">
    {{ text }}
  </div>
</template>
