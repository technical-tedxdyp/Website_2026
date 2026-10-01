'use client';

import React, { useEffect, useState } from 'react';

export type PaymentStep = 'verifying' | 'generating' | 'redirecting' | 'error';

interface PaymentRedirectLoaderProps {
    isOpen: boolean;
    step?: PaymentStep;
    bookingId?: string;
    errorMessage?: string;
    onRetry?: () => void;
    onClose?: () => void;
}

export default function PaymentRedirectLoader({
    isOpen,
    step = 'verifying',
    bookingId,
    errorMessage,
    onRetry,
    onClose,
}: PaymentRedirectLoaderProps) {
    const [dots, setDots] = useState('');
    const progress = step === 'verifying' ? 40 : step === 'generating' ? 75 : 100;

    // Animated dots for "Please wait, redirecting..."
    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 400);
        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-loader-title"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,0,40,0.18)_0%,transparent_70%)] pointer-events-none" />

            {/* Brutalist Container */}
            <div className="relative w-full max-w-lg bg-[#111111] border-2 border-zinc-700 shadow-[8px_8px_0px_0px_rgba(235,0,40,0.9)] overflow-hidden transition-all duration-300">

                {/* Top Accent Strip */}
                <div className="h-2 bg-[#EB0028] w-full" />

                <div className="p-6 md:p-8">
                    {step === 'error' ? (
                        /* Error State */
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-red-950/60 border-2 border-[#EB0028] rounded-full flex items-center justify-center mx-auto text-[#EB0028]">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <div>
                                <span className="inline-block px-2.5 py-1 bg-red-950/80 border border-red-800 text-red-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
                                    Verification Alert
                                </span>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                                    Payment Needs Review
                                </h2>
                                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                                    {errorMessage || 'Your payment was received, but server verification took longer than expected.'}
                                </p>
                            </div>

                            {bookingId && (
                                <div className="bg-black border border-zinc-800 p-3 text-left">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">Booking Reference</span>
                                    <span className="font-mono text-sm text-zinc-200 break-all">{bookingId}</span>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                {onRetry && (
                                    <button
                                        type="button"
                                        onClick={onRetry}
                                        className="flex-1 bg-[#EB0028] hover:bg-red-700 text-white font-bold py-3.5 px-4 text-xs uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                                    >
                                        Retry Verification
                                    </button>
                                )}
                                {onClose && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 px-4 text-xs uppercase tracking-widest border border-zinc-700 transition-colors cursor-pointer"
                                    >
                                        Close & Check Email
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Processing / Redirecting State */
                        <div className="space-y-6">

                            {/* Animated Pulse / Icon */}
                            <div className="flex items-center justify-center">
                                <div className="relative flex items-center justify-center">
                                    {/* Concentric Pulsing Rings */}
                                    <div className="absolute w-24 h-24 rounded-full border border-[#EB0028]/40 animate-ping" />
                                    <div className="absolute w-20 h-20 rounded-full border-2 border-[#EB0028]/60 animate-pulse" />

                                    {/* Central Red Core with Spinner */}
                                    <div className="relative w-16 h-16 bg-black border-2 border-[#EB0028] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(235,0,40,0.5)]">
                                        <svg className="w-8 h-8 text-[#EB0028] animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Header Titles */}
                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/60 border border-green-700/80 rounded-full text-green-400 text-[11px] font-bold uppercase tracking-[0.15em]">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Payment Received
                                </div>
                                <h2 id="payment-loader-title" className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                                    Please Wait, Redirecting<span className="inline-block w-6 text-left text-[#EB0028]">{dots}</span>
                                </h2>
                                <p className="text-zinc-400 text-xs md:text-sm font-medium">
                                    Do not close or refresh this page. We are finalizing your booking and dispatching your tickets.
                                </p>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                                    <span>Processing Transaction</span>
                                    <span className="text-[#EB0028] font-mono">{progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-0.5">
                                    <div
                                        className="h-full bg-linear-to-r from-[#EB0028] via-red-500 to-green-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(235,0,40,0.8)]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Live Verification Steps */}
                            <div className="bg-black/60 border border-zinc-800/90 p-4 rounded-sm space-y-3 font-sans">

                                {/* Step 1: Payment Received */}
                                <div className="flex items-center gap-3 text-xs">
                                    <div className="w-5 h-5 rounded-full bg-green-950 border border-green-500 flex items-center justify-center text-green-400 shrink-0">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
                                        Razorpay Payment Authorized
                                    </span>
                                </div>

                                {/* Step 2: Verification */}
                                <div className="flex items-center gap-3 text-xs">
                                    {step === 'verifying' ? (
                                        <div className="w-5 h-5 rounded-full bg-red-950 border border-[#EB0028] flex items-center justify-center text-[#EB0028] shrink-0 animate-spin">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-green-950 border border-green-500 flex items-center justify-center text-green-400 shrink-0">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <span className={`font-semibold uppercase tracking-wider text-[11px] ${step === 'verifying' ? 'text-white' : 'text-zinc-200'}`}>
                                        Verifying Cryptographic Signature
                                    </span>
                                </div>

                                {/* Step 3: Ticket Generation & Dispatch */}
                                <div className="flex items-center gap-3 text-xs">
                                    {step === 'verifying' ? (
                                        <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-600 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                        </div>
                                    ) : step === 'generating' ? (
                                        <div className="w-5 h-5 rounded-full bg-red-950 border border-[#EB0028] flex items-center justify-center text-[#EB0028] shrink-0 animate-spin">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-green-950 border border-green-500 flex items-center justify-center text-green-400 shrink-0">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <span className={`font-semibold uppercase tracking-wider text-[11px] ${step === 'generating' ? 'text-white' : step === 'redirecting' ? 'text-zinc-200' : 'text-zinc-500'}`}>
                                        Generating QR Ticket & Sending Email
                                    </span>
                                </div>

                                {/* Step 4: Final Redirect */}
                                <div className="flex items-center gap-3 text-xs">
                                    {step === 'redirecting' ? (
                                        <div className="w-5 h-5 rounded-full bg-green-950 border border-green-500 flex items-center justify-center text-green-400 shrink-0 animate-bounce">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-600 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                        </div>
                                    )}
                                    <span className={`font-semibold uppercase tracking-wider text-[11px] ${step === 'redirecting' ? 'text-green-400 font-bold' : 'text-zinc-500'}`}>
                                        Opening Ticket Confirmation...
                                    </span>
                                </div>

                            </div>

                            {/* Trust & Security Footer Note */}
                            <div className="pt-1 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>256-Bit SSL Encrypted</span>
                                </div>
                                <span>TEDx DYPAKURDI</span>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
