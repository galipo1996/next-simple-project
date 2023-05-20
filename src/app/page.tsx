import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
export const metadata: Metadata = {
  title: 'Generation code | home',
  description: 'open source api Gen',
}
export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
          <LargeHeading
            size='lg'
            className='three-d text-black dark:text-light-gold'
          >
            Easily determine <br />
            Api key resemblance.
          </LargeHeading>

          <Paragraph className='max-w-xl lg:text-left'>
            With the Text Gen API, you can easily determine the resemblance
            between two pieces of text with a free{' '}
            <Link
              href='/login'
              className='underline underline-offset-2 text-black dark:text-light-gold'
            >
              API key
            </Link>
            .
          </Paragraph>

          <div className='relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute'>
            <Image
              priority
              className='img-shadow'
              quality={100}
              style={{ objectFit: 'contain' }}
              fill
              src='/ban.png'
              alt='tower of god'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
