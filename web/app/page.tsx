import React from "react";
import HeroSection from "@/components/dashboard/hero";
import StatsSection from "@/components/dashboard/stats";
import FeaturesSection from "@/components/dashboard/features";
import HowItWorksSection from "@/components/dashboard/how-it-works";
import CTASection from "@/components/dashboard/cta";

const LandingPage = () => {
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
