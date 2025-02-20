export default function ErrorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className="bg-white">
                {children}
            </body>
        </html>
    )
} 