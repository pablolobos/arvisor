import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { HomePayload } from "@/sanity/lib/queries";

interface HeaderProps {
  home: HomePayload
}

export default function Header({ home }: HeaderProps) {
  if (!home) return null;

  return (
    <header className="z-50 inset-0 flex items-center bg-br bg-brand-grayLightest backdrop-blur-lg h-24">
      <div className="sm:px-6 py-6 container">
        <div className="flex justify-between items-center gap-5">
          <Logo />

        </div>
      </div>
    </header>
  );
}