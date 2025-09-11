"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <SignIn afterSignInUrl="/home" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;


