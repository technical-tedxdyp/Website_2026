'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
        return (
            <div className="text-center p-8 bg-zinc-900 border-2 border-zinc-800 max-w-md w-full">
                <h1 className="text-3xl font-black tracking-tighter mb-4 text-[#eb0028]">ERROR</h1>
                <p className="text-zinc-400 text-sm mb-6">No booking reference found in this session.</p>
                <button
                    onClick={() => router.push('/')}
                    className="w-full bg-white hover:bg-zinc-200 text-black px-6 py-4 font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#111111] border-2 border-zinc-700 shadow-[8px_8px_0px_0px_rgba(235,0,40,0.9)] p-8 md:p-10 max-w-lg w-full text-center relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#eb0028]" />

            {/* Success Badge */}
            <div className="w-20 h-20 bg-green-950/80 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>

            <div className="inline-block px-3 py-1 bg-green-950/60 border border-green-700/80 rounded-full text-green-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
                Ticket Issued & Dispatched
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-white uppercase">
                Payment <span className="text-[#eb0028]">Verified</span>
            </h1>

            <p className="text-zinc-400 text-sm font-medium mb-6">
                Your transaction was successful and your TEDx seat is officially confirmed!
            </p>

            {/* Booking Reference Box */}
            <div className="bg-black border border-zinc-800 p-5 text-left mb-6 relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Booking Reference</p>
                <p className="text-base md:text-lg font-mono text-white break-all">{bookingId}</p>
            </div>

            <div className="p-4 bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-400 mb-8 space-y-2 text-left">
                <div className="flex items-start gap-2">
                    <span className="text-[#eb0028] font-bold">✓</span>
                    <span>We have sent your ticket confirmation & PDF directly to your email.</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-[#eb0028] font-bold">✓</span>
                    <span>Please keep your QR code ready for seamless check-in at the venue.</span>
                </div>
            </div>

            <div className="space-y-3">
                <Link
                    href={`/ticket/${bookingId}`}
                    className="block w-full bg-[#eb0028] hover:bg-[#c2001f] text-white font-black py-4 uppercase tracking-[0.2em] text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
                >
                    View / Download Digital Ticket
                </Link>
                <Link
                    href="/"
                    className="block w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-3.5 uppercase tracking-[0.2em] text-xs border border-zinc-700 transition-colors"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-sans relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,0,40,0.12)_0%,transparent_70%)] pointer-events-none" />
            <Suspense fallback={<div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
