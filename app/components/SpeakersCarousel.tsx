"use client";

import React, { useState } from 'react';

const SPEAKERS = [
    { name: 'Dr.Anuj Pachhel', role: 'YouTuber / Doctor', talk: 'Talk title to be announced', image: '/speakers/Anuj_Pachhel.svg' },
    { name: 'Mrs.Apurva Nemlekar', role: 'Actress', talk: 'Talk title to be announced', image: '/speakers/Apurva_Nemlekar_New.svg' },
    { name: 'Mr.Dinakar Nagalla', role: 'Entrepreneur', talk: 'Talk title to be announced', image: '/speakers/Dinakar_Nagalla.svg' },
    { name: 'Dr. Ajit Kembhavi', role: 'Astrophysicist', talk: 'Talk title to be announced', image: '/speakers/Dr_Ajit_Kembhavi.svg' },
    { name: 'Mrs.Sonali Sonawane', role: 'Singer', talk: 'Talk title to be announced', image: '/speakers/Sonali_Sonawane.svg' },
    { name: 'Mr.Adil Nargolwala (Iron Man)', role: 'Indusrtialist', talk: 'Talk title to be announced', image: '/speakers/Adil_Nargolwala.svg' },
];

export default function SpeakersCarousel() {
    const [active, setActive] = useState(2);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const prevSpeaker = () => setActive((i) => (i - 1 + SPEAKERS.length) % SPEAKERS.length);
    const nextSpeaker = () => setActive((i) => (i + 1) % SPEAKERS.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        if (diff > 50) {
            nextSpeaker();
        } else if (diff < -50) {
            prevSpeaker();
        }
        setTouchStart(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            prevSpeaker();
        } else if (e.key === 'ArrowRight') {
            nextSpeaker();
        }
    };

    return (
        <section
            id="speakers"
            className="bg-cream text-black px-4 sm:px-8 md:px-16 lg:px-24 pt-16 md:pt-20 lg:pt-28 pb-20 md:pb-28 lg:pb-32 overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Speakers Carousel Section. Use left and right arrow keys to navigate."
        >
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
                <p className="font-pixel text-brand uppercase tracking-[0.3em] mb-2 md:mb-3 text-xs md:text-sm">Voices of the Mosaic</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">
                    Featured <span className="text-brand">Speakers</span>
                </h2>
            </div>

            <div className="speakers-stage relative h-[420px] sm:h-[480px] md:h-[500px] lg:h-[560px] xl:h-[600px] 2xl:h-[640px] flex items-center justify-center">
                {SPEAKERS.map((speaker, i) => {
                    let offset = i - active;
                    if (offset < -2) offset += SPEAKERS.length;
                    if (offset > 3) offset -= SPEAKERS.length;

                    const isCenter = offset === 0;
                    const abs = Math.abs(offset);
                    if (abs > 3) return null;

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            className="group absolute top-1/2 left-1/2 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[240px] xl:w-[280px] 2xl:w-[300px] text-left cursor-pointer focus:outline-none"
                            style={{
                                transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--card-offset, 155px))) rotateY(${offset * -18}deg) scale(${isCenter ? 1.15 : 0.92 - abs * 0.04})`,
                                zIndex: 20 - abs,
                                transformStyle: 'preserve-3d',
                                transition: 'all 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            aria-current={isCenter ? 'true' : undefined}
                            aria-label={`${speaker.name} ${i + 1}`}
                        >
                            <div
                                className={`bg-white overflow-hidden transition-all duration-500 ${isCenter
                                    ? 'border-[4px] lg:border-[6px] border-brand shadow-[8px_12px_0_0_rgba(0,0,0,0.08)] lg:shadow-[12px_16px_0_0_rgba(0,0,0,0.12)]'
                                    : 'border border-black/10 hover:border-black/30'
                                    }`}
                            >
                                <div className="relative h-[220px] sm:h-[260px] md:h-[290px] lg:h-[340px] xl:h-[380px] 2xl:h-[400px] bg-neutral-200 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 ease-out ${isCenter ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                                            }`}
                                    />
                                </div>
                                <div className="p-3 sm:p-3.5 md:p-4 lg:p-5 xl:p-6">
                                    <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-tight">
                                        {speaker.name}
                                    </p>
                                    <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm tracking-widest uppercase text-neutral-500 mt-1 lg:mt-1.5">
                                        {speaker.role}
                                    </p>
                                    {isCenter && (
                                        <p className="text-[11px] sm:text-xs md:text-xs lg:text-sm text-brand mt-2 lg:mt-3 flex items-center gap-1.5 font-medium">
                                            <span className="font-mono">↗</span> {speaker.talk}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12">
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        type="button"
                        onClick={prevSpeaker}
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center text-xl md:text-2xl font-bold cursor-pointer"
                        aria-label="Previous speaker"
                    >
                        ‹
                    </button>
                    <div className="flex items-center gap-1.5 md:gap-2">
                        {SPEAKERS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActive(i)}
                                className={`h-1.5 md:h-2 lg:h-2.5 transition-all cursor-pointer ${i === active ? 'w-8 md:w-12 lg:w-16 bg-brand' : 'w-1.5 md:w-2 lg:w-2.5 bg-black/30 hover:bg-black/60'
                                    }`}
                                aria-label={`Go to speaker ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={nextSpeaker}
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center text-xl md:text-2xl font-bold cursor-pointer"
                        aria-label="Next speaker"
                    >
                        ›
                    </button>
                </div>
                <span className="font-pixel text-xs md:text-sm text-neutral-500 uppercase tracking-widest sm:ml-4">
                    {String(active + 1).padStart(2, '0')} / {String(SPEAKERS.length).padStart(2, '0')}
                </span>
            </div>
        </section>
    );
}

