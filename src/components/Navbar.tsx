import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { ButtonVariants } from './ui/Button'
import SignInButton from './ui/SignInButton'
import SignOutButton from './ui/SignOutButton'
import { ThemeToggle } from './ThemeToggle'
import { authOptions } from '@/lib/authOptions'

interface NavbarProps {}

const Navbar = async ({}: NavbarProps) => {
  const session = await getServerSession(authOptions)
  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link href='/' className={ButtonVariants({ variant: 'link' })}>
          Text similarity
        </Link>
        <div className='md:hidden'>
          <ThemeToggle />
        </div>
        <div className='hidden md:flex gap-4'>
          <ThemeToggle />
          <Link
            href='/documentation'
            className={ButtonVariants({ variant: 'ghost' })}
          >
            Documentation
          </Link>
          {session ? (
            <>
              <Link
                className={ButtonVariants({ variant: 'ghost' })}
                href='/dashboard'
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
