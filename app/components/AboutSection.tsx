import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Left Side: Typography & Description */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              About <span className="text-red-600">TEDx</span> Crossroads
            </h2>
            <div className="w-20 h-1 bg-red-600 rounded-full"></div>
            <p className="text-gray-300 text-lg leading-relaxed pt-4">
              At the intersection of technology, art, and human experience lies the crossroads of our future. 
              This year, we bring together visionaries, thinkers, and creators who stand at these pivotal 
              junctures, sharing ideas that challenge our perspectives and illuminate new paths forward.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Join us for a day of immersive talks, deep connections, and ideas worth spreading. 
              Whether you are looking for inspiration, innovation, or a fresh lens on the world, 
              you'll find it here.
            </p>
          </div>

          {/* Right Side: Stats/Visuals */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform transition duration-500 hover:scale-105 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)]">
                <span className="text-5xl font-black text-red-600 mb-2">12+</span>
                <span className="text-gray-400 font-medium">Inspiring Speakers</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform transition duration-500 hover:scale-105 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] mt-8">
                <span className="text-5xl font-black text-red-600 mb-2">2</span>
                <span className="text-gray-400 font-medium">Engaging Sessions</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform transition duration-500 hover:scale-105 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] -mt-8">
                <span className="text-5xl font-black text-red-600 mb-2">500+</span>
                <span className="text-gray-400 font-medium">Attendees</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center transform transition duration-500 hover:scale-105 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)]">
                <span className="text-5xl font-black text-red-600 mb-2">1</span>
                <span className="text-gray-400 font-medium">Unforgettable Day</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
