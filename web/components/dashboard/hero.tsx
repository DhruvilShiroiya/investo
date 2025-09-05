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
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mt-10">
          Smarter Investing with <span className="text-blue-600">AI</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Investo helps you analyze stocks and metals, track real-time markets,
          and get AI-powered portfolio guidance based on historical data and
          news sentiment.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="rounded-2xl border">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Watch Demo
          </Button>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0"> 
          <div ref={imageRef} className="hero-image"> 
            <Image 
            src="/banner.jpeg" 
            width={1080} 
            height={720} 
            alt="Dashboard Preview" 
            className="rounded-lg shadow-2xl border mx-auto" 
            priority /> 
          </div> 
        </div>
      </div>
    </section>
  );
};

export default HeroSection;