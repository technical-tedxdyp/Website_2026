import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col text-white font-sans">
      {/* Cream Navbar */}
      <header className="bg-[var(--cream)] text-black py-4 px-6 md:px-12 flex justify-between items-center border-b-[8px] border-black">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/tedxlogo.svg"
            alt="TEDx DYPAKURDI"
            width={48}
            height={39}
            className="h-10 w-auto"
            priority
          />
          <span className="font-bold text-2xl tracking-tighter">
            <span className="text-[var(--brand-red)]">TEDx</span> DYPAKURDI
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-widest uppercase">
          <a href="/#theme" className="hover:text-[var(--brand-red)] transition-colors">Theme</a>
          <a href="/#speakers" className="hover:text-[var(--brand-red)] transition-colors">Speakers</a>
          <a href="/#schedule" className="hover:text-[var(--brand-red)] transition-colors">Schedule</a>
          <a href="/#tickets" className="hover:text-[var(--brand-red)] transition-colors">Tickets</a>
        </nav>
        
        <Link href="/sessions">
          <button className="bg-[var(--brand-red)] text-white font-bold uppercase tracking-wider text-sm px-6 py-3 border-2 border-black hover:bg-red-700 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
            Book Tickets
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer sticky bar */}
      <footer className="bg-[var(--cream)] text-black border-t-2 border-black py-4 px-6 md:px-12 flex justify-between items-center z-50">
        <div>
          <h4 className="font-bold text-lg">Meandering in the Mosaic</h4>
          <p className="text-xs font-pixel text-gray-600 uppercase tracking-widest mt-1">TBA • 2026 • VENUE NAME</p>
        </div>
        
        <div className="flex gap-4 items-center">
          <Link href="/sessions">
            <button className="bg-[var(--brand-red)] text-white font-bold uppercase tracking-wider text-sm px-6 py-3 border-2 border-black flex items-center hover:bg-red-700 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              Book Tickets <span className="ml-2">→</span>
            </button>
          </Link>
          <div className="bg-[#1a2b3c] text-white px-4 py-2 rounded-full text-xs flex items-center font-bold font-sans">
            <span className="text-[var(--brand-red)] mr-2">✦</span> Powered by Netlify
          </div>
        </div>
      </footer>
    </div>
  );
}
