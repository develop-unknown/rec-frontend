import type { QueryObject, QueryValue } from 'ufo'

/**
 * Interface:都道府県毎の人口構成
 */
export interface Composition {
  label: string
  data: [
    {
      year: number
      value: number
      rate?: number | undefined
    }
  ]
}
/**
 * Interface:区切り年毎の人口構成
 */
export interface CompositionPerYear {
  boundaryYear: number
  data: Composition[]
}
/**
 * Interface
 * Response:api/v1/population/composition/perYear
 */
interface CompositionPerYearResponse {
  message: null
  result: CompositionPerYear
}
/**
 * Interface
 * Request:api/v1/population/composition/perYear
 */
interface CompositionPerYearRequest {
  prefCode: number
  cityCode: string
  addArea?: string | undefined
}

// 「すべての市区町村」取得時パラメータ
const ALL_CITY_CODE_PARAM = '-'

export default defineEventHandler(async (event): Promise<CompositionPerYear> => {
  const config = useRuntimeConfig()
  const BASE_URL = config.public.resasApiBase
  const URL = `api/v1/population/composition/perYear`
  const METHOD = 'GET'
  const HEADERS = { 'Content-Type': 'application/json', 'X-API-KEY': config.apiKey }

  const params = getQuery(event)
  if (!params) {
    throw createError({
      statusCode: 400,
      statusMessage: '',
    })
  }

  const response = await $fetch<CompositionPerYearResponse>(`${BASE_URL}${URL}`, {
    method: METHOD,
    credentials: 'include',
    headers: HEADERS,
    keepalive: true,
    params: validationParams(params),
  })

  const { result } = response
  return result
})

/**
 * GET:複数指定を除いてパラメータを取得
 * @param value QueryValue | QueryValue[]
 * @returns QueryValue | undefined
 */
const getOneParameter = (value?: QueryValue | QueryValue[]): QueryValue | undefined => {
  if (Array.isArray(value)) {
    if (value.length) return value[0]
    else return undefined
  } else return value ?? undefined
}

/**
 * 変換:QueryValue → Number
 * @param value QueryValue
 * @returns number | undefined
 */
const toNumber = (value?: QueryValue): number | undefined => {
  if (value !== 0 && !value) return undefined
  if (typeof value === 'number') return value
  else {
    const convertValue = Number(value)
    if (isNaN(convertValue)) return undefined
    else {
      return convertValue
    }
  }
}

/**
 * 変換:QueryValue → String
 * @param value QueryValue
 * @returns number | undefined
 */
const toString = (value?: QueryValue): string | undefined => {
  if (!value) return undefined
  if (typeof value === 'string') return value
  else {
    const convertValue = String(value)
    return convertValue
  }
}

/**
 * 検証:CompositionPerYearRequest正常か検証
 * @param params QueryObject
 * @returns CompositionPerYearRequest
 */
const validationParams = (params: QueryObject): CompositionPerYearRequest => {
  if (!params || !('prefCode' in params || 'cityCode' in params)) {
    throw createError({
      statusCode: 400,
      statusMessage: '',
    })
  } else {
    const prefCode = toNumber(getOneParameter(params['prefCode']))
    const cityCode = toString(getOneParameter(params['cityCode']))
    const addArea = toString(getOneParameter(params['addArea']))
    if (!prefCode) {
      throw createError({
        statusCode: 400,
        statusMessage: '',
      })
    } else {
      const request: CompositionPerYearRequest = {
        prefCode,
        cityCode: cityCode ?? ALL_CITY_CODE_PARAM,
        addArea,
      }
      return request
    }
  }
}
