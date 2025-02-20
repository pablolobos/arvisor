import { notFound } from 'next/navigation'
import SuccessContent from './SuccessContent'

type Props = {
    params: Promise<{}>
    searchParams: Promise<{
        name?: string | string[]
        type?: string | string[]
    }>
}

export default async function SuccessPage({
    searchParams,
}: Props) {
    const params = await searchParams
    const name = typeof params.name === 'string' ? params.name : undefined
    const type = typeof params.type === 'string' ? params.type : undefined

    if (!name || !type) {
        return notFound()
    }

    return <SuccessContent name={name} type={type} />
} 