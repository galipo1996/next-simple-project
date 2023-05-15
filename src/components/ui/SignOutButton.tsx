'use client'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import Button from './Button'

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const logoutGoogle = async () => {
    setIsLoading(false)
    try {
      await signOut()
    } catch (error) {
      // toast({
      //   title: 'sign out error',
      //   message: 'please try again later!',
      //   type: 'error',
      // })
    }
  }
  return (
    <Button isLoading={isLoading} onClick={logoutGoogle}>
      SignOutButton
    </Button>
  )
}

export default SignOutButton
