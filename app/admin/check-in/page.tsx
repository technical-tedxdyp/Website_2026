// app/admin/check-in/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketScanner() {
  const [identifier, setIdentifier] = useState('');
  const [ticketData, setTicketData] = useState<any>(null);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Ensure admin is logged in before rendering
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    setTicketData(null);
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/admin/ticket/verify`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ ticketId: identifier }), // Backend accepts ticketId, bookingId, or qrPayload
      });

      const response = await res.json();

      if (res.ok && response.data) {
        setTicketData(response.data);
        if (!response.data.valid) {
          setStatusMsg({ type: 'error', text: response.data.reason || 'Ticket is invalid.' });
        } else if (response.data.alreadyCheckedIn) {
          setStatusMsg({ type: 'error', text: 'Warning: Ticket has already been checked in.' });
        } else {
          setStatusMsg({ type: 'success', text: 'Ticket verified. Ready for check-in.' });
        }
      } else {
        setStatusMsg({ type: 'error', text: response.message || 'Verification failed.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    setStatusMsg({ type: '', text: '' });
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/admin/ticket/check-in`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ 
          ticketId: identifier,
          scannedBy: 'Admin Desk' // Optional, based on your backend schema
        }),
      });

      const response = await res.json();

      if (res.ok && response.success) {
        setStatusMsg({ type: 'success', text: 'Check-in successful! Attendee recorded.' });
        setTicketData({ ...ticketData, alreadyCheckedIn: true });
        setIdentifier(''); // Clear input for the next person
      } else {
        setStatusMsg({ type: 'error', text: response.message || 'Check-in failed.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error during check-in.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">
              TED<span className="text-[#eb0028]">x</span> <span className="text-zinc-500 font-medium tracking-normal text-2xl">Scanner</span>
            </h1>
          </div>
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Status Messages */}
        {statusMsg.text && (
          <div className={`mb-6 p-4 border-l-4 font-medium ${statusMsg.type === 'error' ? 'bg-red-950/30 border-[#eb0028] text-red-200' : 'bg-green-950/30 border-green-500 text-green-200'}`}>
            {statusMsg.text}
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="mb-8">
          <label htmlFor="identifier" className="block text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">
            Enter Ticket ID / Booking ID
          </label>
          <div className="flex gap-4">
            <input
              id="identifier"
              type="text"
              placeholder="e.g. 64a7f9b8e..."
              className="flex-1 bg-zinc-900 border border-zinc-800 p-4 text-lg focus:outline-none focus:border-[#eb0028] transition-colors rounded-sm placeholder-zinc-700"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <button 
              type="submit"
              disabled={loading || !identifier}
              className="bg-white text-black hover:bg-zinc-200 font-bold px-8 py-4 uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Verify'}
            </button>
          </div>
        </form>

        {/* Ticket Details & Check-In Action */}
        {ticketData && ticketData.booking && (
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm shadow-2xl">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-zinc-800 uppercase tracking-widest text-zinc-400">
              Attendee Profile
            </h2>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Name</p>
                <p className="text-xl font-medium">{ticketData.booking.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Ticket ID</p>
                <p className="text-lg font-mono text-zinc-300">{ticketData.booking.ticketId}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Booking Status</p>
                <p className={`text-lg font-bold ${ticketData.booking.bookingStatus === 'PAYMENT_SUCCESS' ? 'text-green-500' : 'text-[#eb0028]'}`}>
                  {ticketData.booking.bookingStatus.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Tickets Count</p>
                <p className="text-xl font-medium">{ticketData.booking.ticketCount} Admits</p>
              </div>
            </div>

            {/* Check In Button (Only show if valid and not yet checked in) */}
            {ticketData.valid && !ticketData.alreadyCheckedIn && (
              <button
                onClick={handleCheckIn}
                disabled={loading}
                className="w-full bg-[#eb0028] hover:bg-[#c2001f] text-white font-bold py-5 rounded-sm uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(235,0,40,0.4)] disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Entry & Check-In'}
              </button>
            )}

            {ticketData.alreadyCheckedIn && (
              <div className="w-full bg-zinc-800 text-zinc-400 text-center font-bold py-5 rounded-sm uppercase tracking-widest border border-zinc-700">
                Already Checked In
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}