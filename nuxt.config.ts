import * as fs from 'fs'

import locales from './src/i18n/index'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // .envに「NUXT_API_KEY」のような同名が存在すれば上書きされる
  runtimeConfig: {
    apiKey: '',
    public: {
      resasApiBase: 'https://opendata.resas-portal.go.jp/',
    },
  },
  nitro: {
    preset: 'node',
  },
  devServer: {
    https: {
      key: fs.readFileSync('./mkcert/localhost+1-key.pem', 'utf-8'),
      cert: fs.readFileSync('./mkcert/localhost+1.pem', 'utf-8'),
    },
    host: '0.0.0.0',
    port: 3000,
  },
  srcDir: 'src',
  ssr: false,
  app: {
    // baseURL: '/nuxt-template/',
    head: {
      title: 'PORTFORIO',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { hid: 'description', name: 'description', content: 'DESCRIPTION' },
        { 'http-equiv': 'Content-Language', 'content': 'ja' },
        { name: 'google', content: 'notranslate' },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0 viewport-fit=cover',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      noscript: [{ children: 'Javascript is required.' }],
    },
  },
  alias: {
    '@@': `<rootDir>`,
    '~~': `<rootDir>`,
    '@/': '<srcDir>',
    '~/': `<srcDir>`,
  },
  // Preflightのため利用 https://tailwindcss.com/docs/preflight
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
    tsConfig: {
      extends: '@tsconfig/strictest/tsconfig.json',
      compilerOptions: {
        strict: true,
        exactOptionalPropertyTypes: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedIndexedAccess: true,
        noImplicitOverride: true,
        noPropertyAccessFromIndexSignature: true,
      },
    },
  },
  modules: [['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }], '@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'ja',
    vueI18n: {
      legacy: false,
      locale: 'ja',
      messages: {
        ja: locales['ja-JP'],
        en: locales['en-US'],
      },
    },
  },
})
