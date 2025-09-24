"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import HeroSection from "@/components/landing/hero";
import StatsSection from "@/components/landing/stats";
import FeaturesSection from "@/components/landing/features";
import HowItWorksSection from "@/components/landing/how-it-works";
import CTASection from "@/components/landing/cta";

const LandingPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;