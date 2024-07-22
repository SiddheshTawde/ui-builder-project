import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { HEADER_NAV } from "@root/constants/nav.constant";

export default async function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-16 container border-b">
      <div className="flex-1 flex items-center gap-x-4">
        <Link href="/" className="text-2xl font-bold">
          UI Buidler
        </Link>

        <nav className="flex items-center">
          {HEADER_NAV.map((nav) => (
            <Button key={nav.title} variant="link" asChild>
              <Link href={nav.href} target={nav.target} className="flex items-center gap-x-1">
                {nav.title}
                <nav.icon />
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <SignedOut>
        <Button variant="secondary" asChild>
          <SignInButton mode="modal" />
        </Button>
      </SignedOut>

      <SignedIn>
        <UserButton showName />
      </SignedIn>
    </header>
  );
}