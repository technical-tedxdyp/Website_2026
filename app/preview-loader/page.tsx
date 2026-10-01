'use client';

import React, { useState } from 'react';
import PaymentRedirectLoader, { PaymentStep } from '../components/PaymentRedirectLoader';
import Link from 'next/link';

export default function PreviewLoaderPage() {
    const [isOpen, setIsOpen] = useState(true);
    const [step, setStep] = useState<PaymentStep>('verifying');
    const [isSimulating, setIsSimulating] = useState(false);

    const startFullSimulation = async () => {
        setIsSimulating(true);
        setIsOpen(true);
        setStep('verifying');

        // Step 1 -> 2
        await new Promise((r) => setTimeout(r, 2000));
        setStep('generating');

        // Step 2 -> 3
        await new Promise((r) => setTimeout(r, 2000));
        setStep('redirecting');

        // Finish
        await new Promise((r) => setTimeout(r, 2000));
        setIsSimulating(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans flex flex-col items-center justify-center">
            <div className="max-w-xl w-full bg-zinc-900 border-2 border-zinc-800 p-8 space-y-6 text-center">
                <div className="inline-block px-3 py-1 bg-red-950/80 border border-[#EB0028] text-red-300 text-xs font-bold uppercase tracking-widest">
                    Interactive Preview
                </div>

                <h1 className="text-3xl font-black uppercase tracking-tight">
                    Payment Redirecting Interface <span className="text-[#EB0028]">Demo</span>
                </h1>

                <p className="text-zinc-400 text-sm">
                    This is the intermediate screen that appears immediately after Razorpay payment ends and before the user is transitioned to the final ticket confirmation page.
                </p>

                {/* State Control Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <button
                        onClick={() => { setIsOpen(true); setStep('verifying'); }}
                        className={`p-3 text-xs font-bold uppercase tracking-wider border transition-colors ${isOpen && step === 'verifying' ? 'bg-[#EB0028] text-white border-black' : 'bg-black text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                            }`}
                    >
                        1. Verifying
                    </button>
                    <button
                        onClick={() => { setIsOpen(true); setStep('generating'); }}
                        className={`p-3 text-xs font-bold uppercase tracking-wider border transition-colors ${isOpen && step === 'generating' ? 'bg-[#EB0028] text-white border-black' : 'bg-black text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                            }`}
                    >
                        2. Generating
                    </button>
                    <button
                        onClick={() => { setIsOpen(true); setStep('redirecting'); }}
                        className={`p-3 text-xs font-bold uppercase tracking-wider border transition-colors ${isOpen && step === 'redirecting' ? 'bg-[#EB0028] text-white border-black' : 'bg-black text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                            }`}
                    >
                        3. Redirecting
                    </button>
                    <button
                        onClick={() => { setIsOpen(true); setStep('error'); }}
                        className={`p-3 text-xs font-bold uppercase tracking-wider border transition-colors ${isOpen && step === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-black text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                            }`}
                    >
                        4. Error State
                    </button>
                </div>

                <div className="pt-2 space-y-3">
                    <button
                        disabled={isSimulating}
                        onClick={startFullSimulation}
                        className="w-full bg-[#EB0028] hover:bg-red-700 text-white font-black py-4 uppercase tracking-[0.2em] text-xs border border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isSimulating ? 'Simulating Live Flow...' : '▶ Launch Full Real-Time Flow Simulation'}
                    </button>

                    <div className="flex justify-between items-center text-xs text-zinc-500 pt-2 border-t border-zinc-800">
                        <Link href="/" className="hover:text-white transition-colors">← Back to Home</Link>
                        <Link href="/book" className="hover:text-white transition-colors">Go to Booking Page →</Link>
                    </div>
                </div>
            </div>

            {/* The Actual Component */}
            <PaymentRedirectLoader
                isOpen={isOpen}
                step={step}
                bookingId="TEDX-2026-DEMO-89742"
                errorMessage="Payment signature verification taking longer than usual. Your funds are secure."
                onRetry={() => {
                    setStep('verifying');
                    setTimeout(() => setStep('redirecting'), 1500);
                }}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
}
