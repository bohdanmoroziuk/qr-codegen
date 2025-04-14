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
  app: {
    head: {
      title: 'QR Code Generator',
      meta: [
        {
          name: 'description',
          content: 'Generate QR codes from URLs instantly.',
        },
      ],
    },
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
