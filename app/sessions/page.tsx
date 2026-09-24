import React from 'react';
import SessionCard from '../components/SessionCard';
import PublicLayout from '../components/PublicLayout';

export default async function SessionsPage() {
    let sessions = [];
    try {
        const res = await fetch('http://localhost:8080/api/session', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
            sessions = data.data;
        }
    } catch (error) {
        console.error("Failed to fetch sessions:", error);
        sessions = [
            { id: 'morning', title: 'Morning Session', speakers: ['Featured Speakers'], day: 1, timeLabel: '09:00 AM - 01:00 PM IST', price: 499, isActive: true },
            { id: 'evening', title: 'Evening Session', speakers: ['Featured Speakers'], day: 1, timeLabel: '02:00 PM - 06:00 PM IST', price: 499, isActive: true }
        ];
    }

    return (
        <PublicLayout>
            <div className="min-h-screen bg-black py-24 px-6 md:px-24 border-t-2 border-neutral-900">
                <div className="mb-24">
                    <h3 className="font-pixel text-brand uppercase tracking-[0.3em] mb-4">Reserve Your Spot</h3>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        Book <span className="text-brand">Tickets</span>
                    </h1>
                    <p className="font-pixel text-gray-400 max-w-2xl mt-8 lowercase leading-relaxed">
                        secure your place in the mosaic. choose the session that fits your schedule.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
                    {sessions.map((session: any) => (
                        <SessionCard key={session.id} session={session} />
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
