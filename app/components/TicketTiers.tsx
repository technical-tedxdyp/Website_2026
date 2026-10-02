'use client';

import React, { useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';

const TIERS = [
    {
        name: 'Morning',
        price: 'Rs.79',
        note: 'Limited quantity',
        featured: false,
        cta: 'Select Morning',
        speakers: ['Adil Nargolwala', 'Ajit Kembhavi', 'Apurva Nemlekar','Anuj Pachhel'],
    },
    {
        name: 'Full Day',
        price: 'Rs.99',
        note: 'Most popular',
        featured: true,
        cta: 'Select Full Day',
        speakers: ['Adil Nargolwala', 'Ajit Kembhavi', 'Apurva Nemlekar', 'Dinakara Nagalla', 'Anuj Pachhel', 'Sonali Sonawane', 'Band Performance'],
    },
    {
        name: 'Evening',
        price: 'Rs.79',
        note: 'Limited quantity',
        featured: false,
        cta: 'Select Evening',
        speakers: ['Dinakara Nagalla',  'Sonali Sonawane', 'Band Performance'],

    },
];

export default function TicketTiers() {
    const { openBooking } = useBooking();
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let ticking = false;

        const updateStyles = () => {
            const windowHeight = window.innerHeight;

            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();

                // Stagger animations slightly based on index
                const staggerOffset = i * 50;
                const start = windowHeight - 50 - staggerOffset;
                const end = windowHeight * 0.25 - staggerOffset; // Finishes much closer to the top of the screen

                let p = (start - rect.top) / (start - end);
                p = Math.max(0, Math.min(1, p));

                // easeOutCubic for smooth deceleration
                const easedP = 1 - Math.pow(1 - p, 3);

                const scale = 0.85 + easedP * 0.15;
                const opacity = 0.2 + easedP * 0.8;

                card.style.transform = `scale(${scale})`;
                card.style.opacity = `${opacity}`;
            });
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateStyles();
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        // Initial setup
        updateStyles();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <section id="tickets" className="bg-cream text-black px-6 md:px-24 py-24">
            <p className="font-pixel text-brand uppercase tracking-[0.3em] mb-4 text-center">Join the room</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-center mb-16">Ticket Tiers</h2>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 border border-black overflow-hidden">
                {TIERS.map((tier, i) => (
                    <div
                        key={tier.name}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        style={{ willChange: 'transform, opacity' }}
                        className={`flex flex-col p-8 md:p-10 ${i !== 0 ? 'border-t md:border-t-0 md:border-l border-black' : ''} ${tier.featured ? 'bg-black text-white' : 'bg-white'}`}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <h3 className="text-2xl font-bold">
                                {tier.name.split(' ')[0]}
                                {tier.name.includes(' ') && (
                                    <span className={tier.featured ? 'text-brand' : ''}> {tier.name.split(' ').slice(1).join(' ')}</span>
                                )}
                            </h3>
                            {tier.featured && (
                                <span className="bg-brand text-white text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                                    Popular
                                </span>
                            )}
                        </div>
                        <p className="text-5xl font-black tracking-tight mb-2">{tier.price}</p>
                        <p className={`text-xs uppercase tracking-widest mb-8 ${tier.featured ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            {tier.note}
                        </p>
                        <ul className="space-y-3 mb-10 flex-1">
                            {tier.speakers.map((speaker) => (
                                <li key={speaker} className="flex gap-2 text-sm">
                                    <span className={tier.featured ? 'text-brand' : ''}>✓</span>
                                    {speaker}
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => openBooking(tier.name)}
                            className={`block w-full text-center py-3 text-sm font-bold uppercase tracking-widest transition-all cursor-pointer ${tier.featured
                                ? 'bg-brand text-white hover:bg-red-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                                : 'bg-black text-white hover:bg-neutral-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                                }`}
                        >
                            {tier.cta}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
