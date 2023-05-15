import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React, { HTMLAttributes, forwardRef } from 'react'

const InputVariant = cva('', {
  variants: { size: { default: '', sm: '' } },
  defaultVariants: { size: 'default' },
})

interface InputProps
  extends HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariant> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, size, ...props }, ref) => {
    return (
      <input
        className={cn(InputVariant({ className, size }))}
        ref={ref}
        {...props}
      >
        {children}
      </input>
    )
  }
)
Input.displayName = 'Input'
export default Input
