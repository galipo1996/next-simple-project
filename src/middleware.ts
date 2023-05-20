import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
})
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1h'),
})
export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname
    if (pathName.startsWith('/api')) {
      const ip = req.ip ?? '127.0.0.1'
      try {
        const { success } = await rateLimit.limit(ip)

        if (!success) {
          return NextResponse.json({
            error: 'too many request only 5 per hour',
          })
        }

        return NextResponse.next()
      } catch (error) {
        return NextResponse.json({ error: 'Internal server issue' })
      }
    }
    const token = await getToken({ req })
    const isAuth = !!token

    const loginPage = pathName.startsWith('/login')

    const sensitiveRoutes = ['/dashboard']
    const isSenssitive = sensitiveRoutes.some((url) => pathName.startsWith(url))

    if (loginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return NextResponse.next()
    }
    if (!isAuth && isSenssitive) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // if (pathName === '/') {
    //   return NextResponse.redirect(new URL('/dashboard', req.url))
    // }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*'],
}
