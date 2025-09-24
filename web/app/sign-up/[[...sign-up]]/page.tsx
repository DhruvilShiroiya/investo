"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <SignUp
        afterSignUpUrl="/dashboard"
        routing="hash"
        signInUrl="/sign-in"
      />
    </div>
  );
};

export default SignUpPage;




