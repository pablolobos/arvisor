export default function Loading() {
    return (
        <div className="opacity-60 mx-auto px-4 py-8 transition-opacity animate-pulse duration-200 container">
            <div className="gap-6 lg:gap-16 grid grid-cols-1 md:grid-cols-12">
                <div className="flex flex-col gap-8 col-span-1 md:col-span-7 lg:col-span-6">
                    <div className="flex flex-col gap-2">
                        <div className="bg-gray-200 rounded w-3/4 h-12"></div>
                        <div className="bg-gray-200 rounded w-1/2 h-6"></div>
                    </div>
                    <div className="bg-gray-200 rounded h-48"></div>
                </div>
                <div className="flex flex-col gap-8 col-span-1 md:col-span-5 lg:col-span-6">
                    <div className="bg-gray-200 rounded h-64"></div>
                </div>
            </div>
        </div>
    )
} 