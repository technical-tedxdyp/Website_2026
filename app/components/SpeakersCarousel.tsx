"use client";

import React, { useState } from 'react';

const SPEAKERS = [
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&h=800' },
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800' },
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800' },
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800' },
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800' },
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800' },
  { name: 'Speaker Name', role: 'Role / Field', talk: 'Talk title to be announced', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=800' },
];

export default function SpeakersCarousel() {
  const [active, setActive] = useState(3);
  const last = SPEAKERS.length - 1;

  return (
    <section id="speakers" className="bg-[var(--cream)] text-black px-6 md:px-16 pt-16 pb-24 overflow-hidden">
      <div className="relative h-[420px] md:h-[460px] flex items-center justify-center" style={{ perspective: '1200px' }}>
        {SPEAKERS.map((speaker, i) => {
          const offset = i - active;
          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          if (abs > 3) return null;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="absolute top-1/2 left-1/2 w-[150px] md:w-[180px] text-left cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 155}px) rotateY(${offset * -18}deg) scale(${isCenter ? 1.18 : 0.92 - abs * 0.04})`,
                zIndex: 20 - abs,
                transformStyle: 'preserve-3d',
              }}
              aria-current={isCenter ? 'true' : undefined}
              aria-label={`${speaker.name} ${i + 1}`}
            >
              <div className={`bg-white overflow-hidden ${isCenter ? 'border-[5px] border-[var(--brand-red)] shadow-[8px_12px_0_0_rgba(0,0,0,0.08)]' : 'border border-black/10'}`}>
                <div className="relative h-[220px] md:h-[250px] bg-neutral-400 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={speaker.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                </div>
                <div className="px-3 py-3">
                  <p className="font-bold text-sm leading-tight">{speaker.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-neutral-500 mt-1">{speaker.role}</p>
                  {isCenter && (
                    <p className="text-[11px] text-[var(--brand-red)] mt-2 flex items-center gap-1">
                      <span>↗</span> {speaker.talk}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          className="w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
          aria-label="Previous speaker"
        >
          ‹
        </button>
        <div className="flex items-center gap-1.5">
          {SPEAKERS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 transition-all ${i === active ? 'w-8 bg-[var(--brand-red)]' : 'w-1.5 bg-black/30'}`}
              aria-label={`Go to speaker ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setActive((i) => Math.min(last, i + 1))}
          className="w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
          aria-label="Next speaker"
        >
          ›
        </button>
      </div>
    </section>
  );
}
