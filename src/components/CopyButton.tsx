'use client'
import React, { ButtonHTMLAttributes } from 'react'
import Button from './ui/Button'
import { toast } from './ui/Toast'
import { Copy } from 'lucide-react'

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string
}

const CopyButton = ({ className, valueToCopy, ...props }: CopyButtonProps) => {
  const copyFN = () => {
    navigator.clipboard.writeText(valueToCopy)
    toast({
      message: 'API copied in the clipboard',
      title: 'copied',
      type: 'success',
    })
  }
  return (
    <Button {...props} className={className} variant='ghost' onClick={copyFN}>
      <Copy className='h-5 w-5' />
    </Button>
  )
}

export default CopyButton
