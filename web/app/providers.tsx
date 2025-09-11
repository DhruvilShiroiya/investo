"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider>
      {children}
      <Toaster richColors />
    </ClerkProvider>
  );
};




