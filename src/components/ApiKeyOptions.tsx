'use client'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/DropdownMenuPrimitive'
import { Loader2 } from 'lucide-react'
import { toast } from './ui/Toast'
import Button from './ui/Button'
import { createApiKey } from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'
import { useRouter } from 'next/navigation'
interface ApiKeyOptionsProps {
  apiKeyKey: string
}

const ApiKeyOptions = ({ apiKeyKey }: ApiKeyOptionsProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isRevoke, setIsRevoke] = useState<boolean>(false)
  const router = useRouter()

  const revokeCurrentApiKey = async () => {
    setIsRevoke(true)
    try {
      await revokeApiKey()
      toast({
        message: 'API revoked',
        type: 'success',
        title: 'Revoke API',
      })
      router.refresh()
    } catch (error) {
      toast({
        message: '"revoke" there is a problem in our server',
        title: 'error',
        type: 'error',
      })
    } finally {
      setIsRevoke(false)
    }
  }
  const createNewApi = async () => {
    setIsCreating(true)
    try {
      await revokeApiKey()
      await createApiKey()
      toast({
        message: 'API created',
        type: 'success',
        title: 'creation API',
      })
      router.refresh()
    } catch (error) {
      toast({
        message: '"creation" there is a problem in our server please wait!',
        type: 'error',
        title: 'error creation API',
      })
    } finally {
      setIsCreating(false)
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreating || isRevoke} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreating
              ? 'Creating new key'
              : isRevoke
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCreating || isRevoke ? (
            <Loader2 className='animate-spin h-4 w-4' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey)

            toast({
              title: 'Copied',
              message: 'API key copied to clipboard',
              type: 'success',
            })
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={createNewApi}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions
