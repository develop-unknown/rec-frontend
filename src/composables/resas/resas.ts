import type { InjectionKey } from 'vue'

import type { CompositionPerYear } from '@/server/api/resas/population/composition/perYear.get'
import type { Prefecture } from '@/server/api/resas/prefectures.get'
import type { OptionStatus } from '@/utils/interfaces/input.interface'

// eslint-disable-next-line
import type { ApexOptions } from 'apexcharts'

export const useResas = () => {
  const resasState = reactive<{ prefectureList: Prefecture[] }>({
    prefectureList: [],
  })
  // 都道府県選択状態管理 Map<都道府県コード, チェック状態>
  const checkMap = new Map<number, boolean>()
  // 人口構成管理 Map<都道府県コード, 総人口リスト>
  const compositionMap = new Map<number, { data: number[] }>()
  // チャートY軸表示管理用
  const categories = ref<number[]>([])
  // チャート表示データ
  const chartSeries = ref<ApexAxisChartSeries>([])

  /**
   * Initialize
   */
  const initialize = async () => {
    const { data: prefectureList } = await useFetch('/api/resas/prefectures')
    resasState.prefectureList = prefectureList.value ?? []
    return true
  }

  /**
   * Event:チェックボックス状態変更
   * @param option OptionStatus
   */
  const changeChecked = (option: OptionStatus) => {
    checkMap.set(option.code, option.isChecked)
    if (option.isChecked) getCompositionPerTear(option.code)
    else executeDelete(option.code)
  }

  /**
   * GET:都道府県人口構成
   * @param code 都道府県コード
   */
  const getCompositionPerTear = async (code: number) => {
    const targetOption = checkMap.get(code)
    if (targetOption) {
      const { data: composition } = await useFetch('/api/resas/population/composition/perYear', {
        params: {
          prefCode: code,
        },
      })
      if (composition.value) {
        createTotalComposition(code, composition.value)
      }
    }
  }

  /**
   * 作成:チャート表示用総人口データ
   * @param code 都道府県コード
   * @param composition 人口構成情報
   */
  const createTotalComposition = (code: number, composition: CompositionPerYear) => {
    if (composition.data?.length) {
      const totalList = composition.data.find((value) => value.label === '総人口')
      if (totalList) {
        const xRecord: number[] = []
        // 初回取得時の年数以外は対象外とする
        const isInitialize = categories.value.length === 0
        totalList.data.map((record) => {
          if (isInitialize) {
            categories.value.push(record.year)
            xRecord.push(record.value)
          } else if (categories.value.includes(record.year)) {
            xRecord.push(record.value)
          }
          return true
        })
        compositionMap.set(code, { data: xRecord })
        executeCreate(code, { data: xRecord })
      }
    } else {
      console.log('null')
    }
  }

  /**
   * 処理:指定都道府県を表示データから削除
   * @param code 都道府県コード
   */
  const executeDelete = (code: number) => {
    const selectedPrefecture = resasState.prefectureList.find((value) => Number(value.prefCode) === code)
    const targetIndex = chartSeries.value.findIndex((series) => series.name === selectedPrefecture?.prefName)
    chartSeries.value.splice(targetIndex, 1)
  }

  /**
   * 処理:指定都道府県を表示データに追加
   * @param code 都道府県コード
   * @param code 総人口
   */
  const executeCreate = (code: number, composition: { data: number[] }) => {
    const selectedPrefecture = resasState.prefectureList.find((value) => Number(value.prefCode) === code)
    if (selectedPrefecture) {
      const series = categories.value.map((category, index) => {
        return { x: category, y: composition.data[index] }
      })
      chartSeries.value.push({ name: selectedPrefecture.prefName, data: series })
    }
  }

  return {
    resasState,
    checkMap,
    chartSeries,
    initialize,
    changeChecked,
  }
}

// Provide/Inject対応
export type ResasComposable = ReturnType<typeof useResas>
export const ResasComposableKey: InjectionKey<ResasComposable> = Symbol('ResasComposable')
