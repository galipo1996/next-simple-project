import React from 'react'

interface layoutProps {
  children: React.ReactNode
}

const layout = ({ children }: layoutProps) => {
  return <section className='pt-20'>{children}</section>
}

export default layout
