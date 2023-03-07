<script setup lang="ts">
  import ACheckbox from '@/components/atoms/checkbox/ACheckbox.vue'
  import type { ResasComposable } from '@/composables/resas/resas'
  import { ResasComposableKey } from '@/composables/resas/resas'
  import { createNuxtError500 } from '@/utils/common'

  const resasComposable = inject(ResasComposableKey) as ResasComposable
  if (!resasComposable) {
    createNuxtError500()
  }
  const { resasState, changeChecked, checkMap } = resasComposable
</script>

<template>
  <div class="l-prefectures">
    <ACheckbox
      v-for="prefecture of resasState.prefectureList"
      :key="prefecture.prefCode"
      :code="prefecture.prefCode"
      :name="prefecture.prefName"
      :is-checked="checkMap.get(prefecture.prefCode)"
      @on-change="changeChecked"
    ></ACheckbox>
  </div>
</template>

<style scoped>
  .l-prefectures {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
  }
</style>
