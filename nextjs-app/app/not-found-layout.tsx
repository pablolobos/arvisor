import Header from "@/app/components/Header"
import { sanityFetch } from "@/sanity/lib/live"
import { homeQuery } from "@/sanity/lib/queries"
import ConditionalFooter from "./components/ConditionalFooter"

export default async function NotFoundLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: home } = await sanityFetch({
        query: homeQuery,
        stega: false,
    })

    return (
        <>
            <Header home={home} />
            {children}
            <ConditionalFooter />
        </>
    )
} 