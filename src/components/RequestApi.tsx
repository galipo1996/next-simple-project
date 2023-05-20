'use client'
import React, { FormEvent, useState } from 'react'
import { toast } from './ui/Toast'
import { createApiKey } from '@/helpers/create-api-key'
import { Key } from 'lucide-react'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import CopyButton from './CopyButton'
import { Input } from './ui/Input'
import Button from './ui/Button'

const RequestApi: React.FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string | null>(null)

  const creatingApi = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log('ouissama')
      setIsCreating(true)
      const apiCreated = await createApiKey()
      setApiKey(apiCreated)
    } catch (error) {
      if (error instanceof Error) {
        toast({ message: error.message, title: 'creating Api' })
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col gap-6 items-center'>
        <Key className='mx-auto h-12 w-12 text-gray-400' />
        <LargeHeading>Request your Api key</LargeHeading>
        <Paragraph>You have not request an api key yet</Paragraph>
      </div>
      <form
        action='#'
        onSubmit={creatingApi}
        className='mt-6 sm:flex sm:items-center'
      >
        <div className='relative rounded-md shadow-md sm:min-w-0 sm:flex-1'>
          {apiKey && (
            <CopyButton
              type='button'
              valueToCopy={apiKey}
              className='absolute inset-y-0 right-0 animate-in fade-in duration-300'
            />
          )}
          <Input
            readOnly
            value={apiKey ?? ''}
            placeholder='please request api key to display it here'
          />
        </div>
        <div className='flex justify-center mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
          <Button isLoading={isCreating}>Request key</Button>
        </div>
      </form>
    </div>
  )
}

export default RequestApi
