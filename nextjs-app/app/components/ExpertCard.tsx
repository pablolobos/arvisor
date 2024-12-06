import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";

type ExpertCardProps = {
    name: string;
    role: string;
    image: any;
    instagramUrl?: string;
};

export default function ExpertCard({ name, role, image, instagramUrl }: ExpertCardProps) {
    return (
        <div className="flex flex-row items-start md:items-center gap-6 bg-white shadow-md p-3 md:p-6 rounded-xl w-full md:w-auto max-w-2xl">
            <div className="relative flex-shrink-0 w-24 h-24">
                {image && (
                    <Image
                        src={urlForImage(image)?.width(200).height(200).url() as string}
                        alt={image.alt || name}
                        className="rounded-full object-cover"
                        fill
                        sizes="(max-width: 768px) 96px, 96px"
                    />
                )}
            </div>

            <div className="">
                <div className="flex flex-col gap-0">
                    <h3 className="font-bold font-heading text-2xl leading-tight">{name}</h3>
                    <span className="inline-block mt-1 text-black leading-tight">{role}</span>
                </div>

                {instagramUrl && (
                    <Link
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 mt-3 text-brand-purple hover:text-brand-purple/80"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-instagram"
                        >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span>Seguir en Instagram</span>
                    </Link>
                )}
            </div>
        </div>
    );
} 