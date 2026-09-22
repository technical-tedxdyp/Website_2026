import React from 'react';

interface Session {
  id: string;
  title: string;
  speakers: string[];
  day: number;
  startTime: string;
  endTime: string;
  timeLabel: string;
  price: number;
  isActive: boolean;
}

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="bg-black border-[4px] border-[var(--cream)] p-8 relative hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[-8px_-8px_0px_0px_#ff3300] hover:shadow-[0_0_0_0_#ff3300]">
      {/* Decorative inner elements */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-[var(--brand-red)]"></div>
      
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="font-pixel text-[var(--brand-red)] mb-2 uppercase tracking-widest">
            Day {session.day}
          </p>
          <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{session.title}</h3>
        </div>
        <div className="font-pixel text-2xl text-white bg-[var(--brand-red)] px-4 py-2 border-2 border-[var(--cream)]">
          ₹{session.price}
        </div>
      </div>

      <div className="space-y-6 mb-12 font-pixel text-gray-300 uppercase tracking-widest text-sm">
        <div className="flex items-start border-l-2 border-[var(--brand-red)] pl-4">
          <span className="w-24 shrink-0 text-gray-500">Time /</span>
          <span>{session.timeLabel}</span>
        </div>
        
        <div className="flex items-start border-l-2 border-[var(--brand-red)] pl-4">
          <span className="w-24 shrink-0 text-gray-500">Speakers /</span>
          <div className="font-sans font-bold text-white tracking-normal text-base">
            {session.speakers.join(', ')}
          </div>
        </div>
      </div>

      <button 
        disabled={!session.isActive}
        className={`w-full py-4 font-bold uppercase tracking-widest text-sm border-2 border-[var(--cream)] transition-all ${
          session.isActive 
            ? 'bg-[var(--brand-red)] hover:bg-red-700 text-white shadow-[4px_4px_0px_0px_#f4f3ed] hover:translate-x-1 hover:translate-y-1 hover:shadow-none' 
            : 'bg-neutral-800 text-gray-500 border-neutral-600 cursor-not-allowed'
        }`}
      >
        {session.isActive ? 'Book Slot' : 'Sold Out'}
      </button>
    </div>
  );
}
