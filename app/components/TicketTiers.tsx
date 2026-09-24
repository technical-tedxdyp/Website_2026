'use client';

import React from 'react';
import { useBooking } from '../context/BookingContext';

const TIERS = [
    {
        name: 'Early Bird',
        price: '₹XXX',
        note: 'Limited quantity',
        featured: false,
        cta: 'Select Early Bird',
        perks: ['Full-day access', 'Welcome kit', 'Netzworking lunch'],
    },
    {
        name: 'Standard',
        price: '₹XXX',
        note: 'Most popular',
        featured: true,
        cta: 'Select Standard',
        perks: ['Full-day access', 'Welcome kit', 'Networking lunch', 'Reserved seating'],
    },
    {
        name: 'Patron',
        price: '₹XXX',
        note: 'Front row experience',
        featured: false,
        cta: 'Select Patron',
        perks: ['Front-row seating', 'Premium kit', 'Speaker meet & greet', 'After-party access'],
    },
];

export default function TicketTiers() {
    const { openBooking } = useBooking();

    return (
        <section id="tickets" className="bg-cream text-black px-6 md:px-24 py-24">
            <p className="font-pixel text-brand uppercase tracking-[0.3em] mb-4 text-center">Join the room</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-center mb-16">Ticket Tiers</h2>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 border border-black">
                {TIERS.map((tier, i) => (
                    <div
                        key={tier.name}
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
                            {tier.perks.map((perk) => (
                                <li key={perk} className="flex gap-2 text-sm">
                                    <span className={tier.featured ? 'text-brand' : ''}>✓</span>
                                    {perk}
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
