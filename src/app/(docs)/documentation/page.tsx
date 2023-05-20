import DocumentationTabs from '@/components/DocumentationTabs'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import type { Metadata } from 'next'
import React from 'react'

interface DocumentationProps {}
export const metadata: Metadata = {
  title: 'Generation code | Documentation',
  description: 'Documentation of the generator api.',
}

const Documentation = ({}: DocumentationProps) => {
  return (
    <div className='container max-w-7xl mx-auto mt-12'>
      <div className='flex flex-col items-center gap-6'>
        <LargeHeading>Making a Request</LargeHeading>
        <Paragraph>api/v1/ban</Paragraph>
        <DocumentationTabs />
      </div>
    </div>
  )
}

export default Documentation
