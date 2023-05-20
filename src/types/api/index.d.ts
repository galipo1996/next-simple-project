import { ApiKey } from '@prisma/client'
import { type ZodIssue } from 'zod'

export interface createApiData {
  error: string | ZodIssue[] | null
  createdApiKey: ApiKey | null
}
export interface revokeApiData {
  error: string | null | ZodIssue[]
  success: boolean
}
