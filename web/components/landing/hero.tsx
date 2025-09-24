"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null); 
  useEffect(() => { 
    const imageElement = imageRef.current; 
    const handleScroll = () => { 
      const scrollPosition = window.scrollY; 
      const scrollThreshold = 100; 
      if (scrollPosition > scrollThreshold) { 
        imageElement?.classList?.add("scrolled"); 
      } else { 
        imageElement?.classList?.remove("scrolled"); 
      } 
    }

    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-28">
      <div className="container mx-auto px-6 text-center">
        <h1 className="max-w-3xl mx-auto text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mt-8">
          Decode Stocks - Metals Correlations with 
          <span className="text-blue-600">AI</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Investo analyzes how stocks and metals move together using historical data,
          real-time signals, and news sentiment—then surfaces techniques tailored to your
          current portfolio. Informational insights only; not an investing platform.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="rounded-2xl border shadow-sm">
            Explore Insights <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Watch Demo
          </Button>
        </div>

        <div className="hero-image-wrapper mt-10 md:mt-12">
          <div ref={imageRef} className="hero-image"> 
            <Image 
            src="/banner.jpeg" 
            width={1080} 
            height={720} 
            alt="Dashboard Preview" 
            className="rounded-xl shadow-2xl ring-1 ring-gray-100 mx-auto" 
            priority /> 
          </div> 
        </div>
      </div>
    </section>
  );
};

export default HeroSection;