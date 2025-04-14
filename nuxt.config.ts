// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  devtools: {
    enabled: true,
  },
  css: [
    '~/assets/styles/main.css',
  ],
  ui: {
    colorMode: false,
  },
  srcDir: 'src/',
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
