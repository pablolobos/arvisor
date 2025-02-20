import { redirect } from 'next/navigation'
import SuccessContent from './SuccessContent'

export default function SuccessPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const name = searchParams.name
    const type = searchParams.type

    if (!name || !type) {
        redirect('/')
    }

    return <SuccessContent name={name.toString()} type={type.toString()} />
} 