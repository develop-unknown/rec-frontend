<script setup lang="ts">
  import { ResasComposableKey, useResas } from '@/composables/resas/resas'
  import { createNuxtError500, injectWithSelf } from '@/utils/common'
  import OFormPrefecture from '@/components/organisms/form/OFormPrefecture.vue'

  provide(ResasComposableKey, useResas())
  const resasComposable = injectWithSelf(ResasComposableKey, useResas())
  if (!resasComposable) {
    createNuxtError500()
  }

  resasComposable?.initialize()
</script>

<template>
  <div class="l-page-container">
    <h1 class="c-page-title">都道府県</h1>
    <OFormPrefecture></OFormPrefecture>
  </div>
</template>

<style scoped>
  .l-page-container {
    max-width: 100vw;
  }
  .c-page-title {
    display: flex;
    border-bottom-width: 2px;
    border-color: dimgrey;
    color: dimgray;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
</style>
