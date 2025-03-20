
import React from 'react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
}

const HeroBanner = ({ title, subtitle }: HeroBannerProps) => {
  return (
    <div className="relative w-full bg-nano-blue text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/b9e41714-5013-499c-bed5-a9cf8fac2206.png')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 md:py-24 lg:py-20 max-w-screen-xl mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {title}
          </h1>
          <div className="h-1 w-16 bg-nano-orange mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl animate-slide-in">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
