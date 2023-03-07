<script lang="ts" setup>
  import { InformationCircleIcon } from '@heroicons/vue/24/outline'
  import VueApexCharts from 'vue3-apexcharts'

  import type { ResasComposable } from '@/composables/resas/resas'
  import { ResasComposableKey } from '@/composables/resas/resas'

  import type { ApexOptions } from 'apexcharts'

  const { t } = useI18n()

  const resasComposable = inject(ResasComposableKey) as ResasComposable
  if (!resasComposable) {
    createNuxtError500()
  }
  const { chartSeries } = resasComposable
  const options = ref<ApexOptions>({
    chart: {
      id: 'apexcharts-line',
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: t('resas.title'),
      align: 'left',
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      title: {
        text: t('unit.perYear'),
      },
      labels: {
        formatter: function (val) {
          return val + ` ${t('unit.year')}`
        },
      },
    },
    yaxis: {
      title: {
        text: `${t('resas.population')}`,
      },
      labels: {
        formatter: function (val) {
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ` ${t('unit.people')}`
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  })
</script>
<template>
  <div class="l-charts-container">
    <template v-if="chartSeries.length">
      <ClientOnly>
        <VueApexCharts type="line" width="100%" height="100%" :options="options" :series="chartSeries"></VueApexCharts>
      </ClientOnly>
    </template>
    <template v-else>
      <div class="l-please-container">
        <p class="c-please-message">
          <InformationCircleIcon class="c-please-message-icon"></InformationCircleIcon>
          {{ $t('message.pleaseSelect') }}
        </p>
      </div>
    </template>
  </div>
</template>
<style scoped>
  .l-charts-container {
    min-height: calc(100vh - 16rem);
    height: calc(100vh - 16rem);
    width: 100%;
  }

  .l-please-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    margin-top: auto;
  }

  .c-please-message {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
  }

  .c-please-message-icon {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }
</style>
