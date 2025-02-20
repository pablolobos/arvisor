'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
    const pathname = usePathname()
    const isSuccessPage = pathname.includes('/success')

    if (isSuccessPage) return null
    return <Footer />
} 