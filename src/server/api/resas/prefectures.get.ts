/**
 * Interface:都道府県情報
 */
export interface Prefecture {
  // 都道府県コード
  prefCode: number
  // 都道府県名
  prefName: string
}
/**
 * Interface
 * Response:api/v1/prefectures
 */
interface PrefecturesResponse {
  message: null
  result: Prefecture[]
}
export default defineEventHandler(async (): Promise<Prefecture[]> => {
  const config = useRuntimeConfig()
  const BASE_URL = config.public.resasApiBase
  const URL = `api/v1/prefectures`
  const METHOD = 'GET'
  const HEADERS = { 'Content-Type': 'application/json', 'X-API-KEY': config.apiKey }

  const response = await $fetch<PrefecturesResponse>(`${BASE_URL}${URL}`, {
    method: METHOD,
    credentials: 'include',
    headers: HEADERS,
    keepalive: true,
  })

  // messageは不要なため都道府県一覧のみ返却
  return response ? response.result : []
})
