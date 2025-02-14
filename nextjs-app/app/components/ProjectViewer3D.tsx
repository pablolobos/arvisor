interface ProjectViewer3DProps {
    viewerUrl: string
}

export default function ProjectViewer3D({ viewerUrl }: ProjectViewer3DProps) {
    return (
        <div className="rounded-lg w-full aspect-[4/3] overflow-hidden">
            <iframe
                src={viewerUrl}
                className="border-0 w-full h-full"
                allow="xr-spatial-tracking"
                allowFullScreen
            />
        </div>
    )
} 