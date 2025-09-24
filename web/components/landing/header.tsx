"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b md:px-4">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline">Login</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="ml-2">
                <UserButton
                  appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }}
                  userProfileMode="navigation"
                  userProfileUrl="/profile"
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;