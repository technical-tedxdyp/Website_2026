import React from 'react';
import PublicLayout from './components/PublicLayout';
import MosaicReveal from './components/MosaicReveal';
import ColorStrip from './components/ColorStrip';
import SpeakersCarousel from './components/SpeakersCarousel';
import Schedule from './components/Schedule';
import TicketTiers from './components/TicketTiers';
import PartnersSection from './components/PartnersSection';
import Image from 'next/image';
import Reveal from './components/Reveal';

export default function Home() {
    return (
        <PublicLayout>
            {/* Top Banner Section */}
            <section className="w-full bg-black text-white flex flex-col items-center justify-center p-12 md:p-20 text-center min-h-[500px]">
                <Reveal className="flex flex-col items-center">
                    <div className="relative w-full max-w-md aspect-[440/355] mb-8">
                        <Image
                            src="/tedxlogo_black_background.svg"
                            alt="TEDx DYPAKURDI mosaic logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
                        Meandering<br />
                        <span className="text-brand text-2xl md:text-3xl tracking-[0.2em] font-pixel block my-2">In The</span>
                        Mosaic
                    </h1>
                    <p className="font-pixel text-gray-400 mt-6 max-w-sm lowercase leading-relaxed">
                        Diverse, fragmented ideas wander, collide, and lock together to form a larger picture.
                    </p>
                    <div className="flex gap-8 mt-10 font-pixel text-sm text-brand uppercase">
                        <span>📅 6 Oct 2026</span>
                        <span>📍DYPAKURDI</span>
                    </div>
                </Reveal>
            </section>

            <ColorStrip />

            {/* The Theme Section */}
            <section id="theme" className="bg-black text-white px-6 md:px-24 py-24 border-b-2 border-neutral-900 overflow-hidden">
                <Reveal>
                    <h3 className="md:hidden font-pixel text-brand uppercase tracking-[0.3em] mb-8">The Theme</h3>
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] max-w-4xl tracking-tighter">
                        Every mind is a tile.<br />
                        Together they form the <br />
                        <span className="text-brand">Mosaic.</span>
                    </h2>
                </Reveal>

                {/* Mobile View */}
                <div className="md:hidden mt-32 max-w-3xl space-y-24">
                    <Reveal delay={100}>
                        <div className="flex flex-col gap-6">
                            <div className="font-pixel text-brand">01</div>
                            <div className="border-t border-neutral-800 pt-4 flex-1">
                                <h4 className="text-3xl font-bold mb-4">Fragment</h4>
                                <p className="font-pixel text-gray-400 leading-loose lowercase max-w-lg">
                                    Ideas begin scattered — messy, personal, incomplete. We honour the fragments before the picture.
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="flex flex-col gap-6">
                            <div className="font-pixel text-brand">02</div>
                            <div className="border-t border-neutral-800 pt-4 flex-1">
                                <h4 className="text-3xl font-bold mb-4">Wander</h4>
                                <p className="font-pixel text-gray-400 leading-loose lowercase max-w-lg">
                                    We meander between disciplines and perspectives, letting curiosity set the path.
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={300}>
                        <div className="flex flex-col gap-6">
                            <div className="font-pixel text-brand">03</div>
                            <div className="border-t border-neutral-800 pt-4 flex-1">
                                <h4 className="text-3xl font-bold mb-4">Assemble</h4>
                                <p className="font-pixel text-gray-400 leading-loose lowercase max-w-lg">
                                    Piece by piece, fragments lock together into something larger than any one voice.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Desktop View (Staircase Stepped Mosaic Layout) */}
                <div className="hidden md:flex flex-col mt-20 lg:mt-24 space-y-16 w-full max-w-6xl mx-auto">
                    <Reveal delay={100}>
                        <div className="w-full max-w-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-pixel text-brand text-sm lg:text-base tracking-wider">01</span>
                                <div className="h-[1px] bg-neutral-800 flex-1" />
                            </div>
                            <h4 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">Fragment</h4>
                            <p className="font-pixel text-gray-400 text-sm lg:text-base leading-relaxed">
                                Ideas begin scattered — messy, personal, incomplete. We honour the fragments before the picture.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="w-full max-w-lg mx-auto">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-pixel text-brand text-sm lg:text-base tracking-wider">02</span>
                                <div className="h-[1px] bg-neutral-800 flex-1" />
                            </div>
                            <h4 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">Wander</h4>
                            <p className="font-pixel text-gray-400 text-sm lg:text-base leading-relaxed">
                                We meander between disciplines and perspectives, letting curiosity set the path.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={300}>
                        <div className="w-full max-w-lg ml-auto">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-pixel text-brand text-sm lg:text-base tracking-wider">03</span>
                                <div className="h-[1px] bg-neutral-800 flex-1" />
                            </div>
                            <h4 className="text-2xl lg:text-3xl font-bold mb-3 text-white tracking-tight">Assemble</h4>
                            <p className="font-pixel text-gray-400 text-sm lg:text-base leading-relaxed">
                                Piece by piece, fragments lock together into something larger than any one voice.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Dictionary & Mosaic Reveal Section */}
            <section className="bg-black text-white px-6 md:px-24 py-24 pb-48 overflow-hidden">
                <Reveal>
                    <h3 className="font-pixel text-brand uppercase tracking-[0.3em] mb-6">What It Means</h3>
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] max-w-3xl tracking-tighter mb-24">
                        A single path, wandering through a thousand <span className="text-brand">tiles.</span>
                    </h2>
                </Reveal>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Definitions */}
                    <div className="w-full lg:w-1/3 space-y-12">
                        <Reveal delay={100}>
                            <div className="border-l-4 border-brand pl-6 py-4 pr-6 bg-white/5 backdrop-blur-md rounded-r-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 group">
                                <h4 className="text-3xl font-bold mb-2 flex items-baseline gap-3">
                                    meander <span className="font-pixel text-gray-500 text-sm transition-colors duration-300 group-hover:text-brand">/mēˈandər/ • verb</span>
                                </h4>
                                <p className="text-gray-300 transition-colors duration-300 group-hover:text-white">
                                    to follow a winding course; to wander led by curiosity rather than a straight line.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={200}>
                            <div className="border-l-4 border-brand pl-6 py-4 pr-6 bg-white/5 backdrop-blur-md rounded-r-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:border-white/10 group">
                                <h4 className="text-3xl font-bold mb-2 flex items-baseline gap-3">
                                    mosaic <span className="font-pixel text-gray-500 text-sm transition-colors duration-300 group-hover:text-brand">/mōˈzāik/ • noun</span>
                                </h4>
                                <p className="text-gray-300 transition-colors duration-300 group-hover:text-white">
                                    a picture made from countless unlike fragments — each meaningless alone, whole only together.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <p className="pt-8 text-gray-400 border-t border-neutral-800">
                                Every speaker is a tile. Every talk, a fragment. <span className="text-brand font-bold">Hover the mosaic</span> to wander the fragments — and watch the whole picture come together.
                            </p>
                        </Reveal>
                    </div>

                    {/* Right: Mosaic Reveal */}
                    <div className="w-full lg:w-2/3">
                        <MosaicReveal />
                    </div>
                </div>
            </section>

            <SpeakersCarousel />
            <ColorStrip />
            <Schedule />
            <TicketTiers />
            <PartnersSection />

        </PublicLayout>
    );
}
