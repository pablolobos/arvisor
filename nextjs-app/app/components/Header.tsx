import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import { HomePayload } from "@/sanity/lib/queries";

interface HeaderProps {
  home: HomePayload
}

export default function Header({ home }: HeaderProps) {
  if (!home) return null;

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
                <WhatsAppButton phoneNumber={home.whatsappNumber} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}