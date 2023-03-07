import type { InjectionKey } from 'vue'
import { getCurrentInstance, inject } from 'vue'

/**
 * Utils:Provide元でInjectし、利用する
 * @param key InjectionKey
 * @param def Composable Type
 * @returns Composable Type | undefined
 */
export const injectWithSelf = <T>(key: InjectionKey<T>, def: T | undefined): T | undefined => {
  const vm = getCurrentInstance() as any
  return vm?.provides[key as any] || inject(key, def)
}

/**
 * Error:500エラー作成
 */
export const createNuxtError500 = () => {
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    fatal: true,
  })
}
