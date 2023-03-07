<script setup lang="ts">
  import OChartLine from '@/components/organisms/chart/OChartLine.vue'
  import OFormPrefecture from '@/components/organisms/form/OFormPrefecture.vue'
  import { ResasComposableKey, useResas } from '@/composables/resas/resas'
  import { createNuxtError500, injectWithSelf } from '@/utils/common'

  provide(ResasComposableKey, useResas())
  const resasComposable = injectWithSelf(ResasComposableKey, useResas())
  if (!resasComposable) {
    createNuxtError500()
  }

  resasComposable?.initialize()
</script>

<template>
  <div class="l-page-container">
    <h1 class="c-page-title">{{ $t('resas.prefecture') }}</h1>
    <OFormPrefecture></OFormPrefecture>
    <div class="flex l-container" style="max-width: 100%; width: 100%">
      <OChartLine></OChartLine>
    </div>
  </div>
</template>

<style scoped>
  .l-page-container {
    max-width: 100%;
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
