import type { InjectionKey } from 'vue'
import type { Prefecture } from '@/server/api/resas/prefectures.get'
import type { OptionStatus } from '@/utils/interfaces/input.interface'

export const useResas = () => {
  const resasState = reactive<{ prefectureList: Prefecture[] }>({
    prefectureList: [],
  })
  const checkMap = new Map<number, boolean>()

  /**
   * Initialize
   */
  const initialize = async () => {
    const { data: prefectureList } = await useFetch('/api/resas/prefectures')
    resasState.prefectureList = prefectureList.value ?? []
  }

  /**
   * Event:チェックボックス状態変更
   * @param option OptionStatus
   */
  const changeChecked = (option: OptionStatus) => {
    checkMap.set(option.code, option.isChecked)
  }

  return {
    resasState,
    checkMap,
    initialize,
    changeChecked,
  }
}

// Provide/Inject対応
export type ResasComposable = ReturnType<typeof useResas>
export const ResasComposableKey: InjectionKey<ResasComposable> = Symbol('ResasComposable')
