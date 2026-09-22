import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80">
        <div className="relative w-full h-full max-w-[1200px] max-h-[800px]">
          <Image
            src="/hero-x.jpg"
            alt="TEDx Crossroad Theme"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-32">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          TEDx <span className="text-red-600">Crossroads</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light drop-shadow-md">
          Ideas that intersect, paths that diverge, and the moments that define our journey.
        </p>
        
        <Link href="/sessions">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            Explore Sessions
          </button>
        </Link>
      </div>

      {/* Gradient overlay to blend with the rest of the dark site */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0"></div>
    </section>
  );
}
