import React from 'react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import RequestApi from '@/components/RequestApi'
import ApiDashboard from '@/components/ApiDashboard'

export const metadata: Metadata = {
  title: 'Generation code | dashboard',
  description: 'open source',
}

const page = async () => {
  const user = await getServerSession(authOptions)

  if (!user) return notFound()
  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  })

  return (
    <div className='max-w-7xl mx-auto mt-16'>
      {apiKey ? <ApiDashboard /> : <RequestApi />}
    </div>
  )
}

export default page
