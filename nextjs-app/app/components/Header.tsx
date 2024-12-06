import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="z-50 fixed inset-0 flex items-center bg-br bg-brand-grayLightest backdrop-blur-lg h-24">
      <div className="sm:px-6 py-6 container">
        <div className="flex justify-between items-center gap-5">
          <Logo />
          <nav className="">
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 font-normal text-sm md:text-base leading-5 tracking-tight"
            >

              <li className="before:block flex sm:gap-4 md:gap-6 sm:before:bg-gray-100 sm:before:w-[1px]">
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link
                    href="https://github.com/sanity-io/sanity-template-nextjs-clean"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only sm:not-sr-only">Instagram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}