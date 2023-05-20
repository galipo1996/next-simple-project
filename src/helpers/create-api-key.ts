//////////////////////
import { createApiData } from '@/types/api'
export const createApiKey = async () => {
  const res = await fetch('/api/api-key/create')

  const data = (await res.json()) as createApiData
  console.log(data)
  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(', '))
    }
    throw new Error(data.error ?? 'Something went wrong') //?? null or undefined
  }
  return data.createdApiKey.key
}
