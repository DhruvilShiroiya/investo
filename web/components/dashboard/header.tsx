import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b md:px-4">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
            <Button variant="outline">Login</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;