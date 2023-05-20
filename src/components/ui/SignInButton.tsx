'use client'
import React, { useState } from 'react'
import Button from './Button'
import { signIn } from 'next-auth/react'
import { toast } from './Toast'

interface SignInButtonProps {}

const SignInButton = ({}: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const LoginGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'sign in error',
        message: 'please try again later',
        type: 'error',
      })
    }
  }
  return (
    <Button isLoading={isLoading} onClick={LoginGoogle}>
      Sign In
    </Button>
  )
}

export default SignInButton
