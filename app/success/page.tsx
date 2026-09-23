// app/success/page.tsx
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
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tighter mb-4 text-[#eb0028]">ERROR</h1>
        <p className="text-zinc-400">No booking reference found.</p>
        <button onClick={() => router.push('/')} className="mt-6 bg-white text-black px-6 py-3 font-bold uppercase">Return Home</button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl max-w-lg w-full text-center">
      <div className="w-20 h-20 bg-green-950 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 className="text-3xl font-black tracking-tighter mb-2">
        Payment <span className="text-green-500">Verified</span>
      </h1>
      
      <p className="text-zinc-400 font-medium mb-8">
        Your transaction was successful and your seats are confirmed.
      </p>

      <div className="bg-black border border-zinc-800 p-6 text-left mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Booking Reference</p>
        <p className="text-lg font-mono text-white break-all">{bookingId}</p>
      </div>

      <p className="text-sm text-zinc-500 mb-8">
        We have generated your ticket and sent the PDF directly to your email address. Please have the QR code ready for check-in on the day of the event.
      </p>

      <Link 
        href="/"
        className="block w-full bg-[#eb0028] hover:bg-[#c2001f] text-white font-bold py-5 rounded-sm uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(235,0,40,0.3)]"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-sans">
      <Suspense fallback={<div className="text-zinc-500 font-bold uppercase tracking-widest">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}