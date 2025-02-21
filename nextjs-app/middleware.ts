import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Add cache headers for static assets
    if (request.nextUrl.pathname.startsWith('/_next/static')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    }

    // Add cache headers for images
    if (request.nextUrl.pathname.startsWith('/_next/image')) {
        response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400')
    }

    return response
}

export const config = {
    matcher: [
        '/_next/static/:path*',
        '/_next/image/:path*',
    ],
} 