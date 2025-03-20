
import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
}

const HeroBanner = ({ title, subtitle }: HeroBannerProps) => {
  return (
    <div className="relative w-full bg-bank text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/b9e41714-5013-499c-bed5-a9cf8fac2206.png')] bg-cover bg-center opacity-30"></div>
      <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:py-20 lg:py-16 max-w-screen-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 animate-fade-in">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl animate-slide-in">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
