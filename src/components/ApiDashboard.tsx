import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'
import { formatDistance } from 'date-fns'
import Paragraph from './ui/Paragraph'
import LargeHeading from './ui/LargeHeading'
import { Input } from './ui/Input'
import Table from './Table'
import ApiKeyOptions from './ApiKeyOptions'

const ApiDashboard = async () => {
  const user = await getServerSession()
  if (!user) return notFound()

  const apiKeys = await db.apiKey.findMany({ where: { userId: user.user.id } })

  const activeApiKey = apiKeys.find((key) => key.enabled)
  if (!activeApiKey) {
    return notFound()
  }
  const userRequest = await db.apiRequest.findMany({
    where: { apiKeyId: { in: apiKeys.map((key) => key.id) } },
  })

  const formedReq = userRequest.map((key) => ({
    ...key,
    timestamp: formatDistance(new Date(key.timestamp), new Date()),
  }))
  return (
    <div className='container flex flex-col gap-6'>
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
        <Paragraph>Your API key:</Paragraph>
        <Input className='w-fit truncate' readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>

      <Paragraph className='text-center md:text-left mt-4 -mb-4'>
        Your API history:
      </Paragraph>

      <Table userRequests={formedReq} />
    </div>
  )
}

export default ApiDashboard
