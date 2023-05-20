'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs'
import SimpleBar from 'simplebar-react'
import Code from './Code'
import { nodejs, python } from '@/helpers/documentation-code'
import 'simplebar-react/dist/simplebar.min.css'
const DocumentationTabs = () => {
  return (
    <Tabs defaultValue='NodeJS' className='max-w-2xl w-full'>
      <TabsList>
        <TabsTrigger value='NodeJS'>NodeJS</TabsTrigger>
        <TabsTrigger value='Python'>Python</TabsTrigger>
      </TabsList>
      <TabsContent value='NodeJS'>
        <SimpleBar>
          <Code language='javascript' animated show code={nodejs} />
        </SimpleBar>
      </TabsContent>
      <TabsContent value='Python'>
        <SimpleBar>
          <Code language='python' animated show code={python} />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  )
}

export default DocumentationTabs
