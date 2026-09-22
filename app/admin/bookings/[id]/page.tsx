import React from 'react';
import Link from 'next/link';

export default async function AdminBookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let bookingData: any = null;
  let entryLogs: any = [];

  try {
    const res = await fetch(`http://localhost:8080/api/admin/bookings/${id}`, { 
      cache: 'no-store',
      headers: {
        'Authorization': 'Bearer TEDX_ADMIN_SECRET_KEY' // Hardcoded for demo
      }
    });
    const data = await res.json();
    if (data.success && data.data) {
      bookingData = data.data.booking;
      entryLogs = data.data.entryLogs || [];
    }
  } catch (error) {
    console.error("Failed to fetch booking details:", error);
    // Mock data for demo
    bookingData = {
      _id: id,
      ticketId: 'TX-12347',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+91 9876543210',
      ticketCount: 3,
      totalAmount: 1497,
      bookingStatus: 'CHECKED_IN',
      checkedInAt: new Date(Date.now() - 7200000).toISOString(),
      checkedInBy: 'Gate A Scanner',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      selectedSessions: [
        { title: 'Morning Session', day: 1, startTime: '09:00 AM', endTime: '01:00 PM' }
      ]
    };
    entryLogs = [
      { _id: 'log1', action: 'ENTRY', scannedBy: 'Gate A Scanner', scannedAt: new Date(Date.now() - 7200000).toISOString(), remarks: 'Valid ticket, checked in.', session: { title: 'Morning Session', day: 1 } }
    ];
  }

  if (!bookingData) {
    return (
      <div className="p-8 text-center text-gray-400">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/bookings" className="text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h2 className="text-2xl font-bold text-white">Booking Details</h2>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
          bookingData.bookingStatus === 'PAYMENT_SUCCESS' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
          bookingData.bookingStatus === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
          bookingData.bookingStatus === 'CHECKED_IN' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
          'bg-red-500/10 text-red-500 border border-red-500/20'
        }`}>
          {bookingData.bookingStatus.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Attendee Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-black border border-neutral-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-3">Attendee Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-white font-medium text-lg">{bookingData.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-white">{bookingData.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-white">{bookingData.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booking Date</p>
                <p className="text-white">{new Date(bookingData.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-black border border-neutral-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-3">Entry Logs</h3>
            {entryLogs.length > 0 ? (
              <div className="space-y-4">
                {entryLogs.map((log: any) => (
                  <div key={log._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-900/50 rounded-lg border border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${log.action === 'ENTRY' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-white font-medium">{log.action}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{log.session?.title} • Scanned by: {log.scannedBy}</p>
                      <p className="text-gray-500 text-xs italic mt-1">{log.remarks}</p>
                    </div>
                    <div className="text-gray-500 text-sm mt-2 sm:mt-0">
                      {new Date(log.scannedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No entry logs found for this booking.</p>
            )}
          </div>
        </div>

        {/* Right Column: Ticket Info */}
        <div className="space-y-6">
          <div className="bg-black border border-neutral-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-3">Order Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Ticket ID</span>
                <span className="text-white font-mono bg-neutral-900 px-2 py-1 rounded">{bookingData.ticketId || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Quantity</span>
                <span className="text-white">{bookingData.ticketCount} tickets</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Amount</span>
                <span className="text-white font-bold text-lg">₹{bookingData.totalAmount}</span>
              </div>
              
              {bookingData.checkedInAt && (
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <span className="text-gray-500 block mb-1">First Check-in</span>
                  <span className="text-green-500 font-medium text-sm">
                    {new Date(bookingData.checkedInAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black border border-neutral-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-800 pb-3">Included Sessions</h3>
            <div className="space-y-3">
              {bookingData.selectedSessions?.map((session: any, index: number) => (
                <div key={index} className="p-3 bg-neutral-900 rounded-lg">
                  <p className="text-white font-medium">{session.title}</p>
                  <p className="text-gray-400 text-xs mt-1">Day {session.day} • {session.startTime} - {session.endTime}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <button className="w-full bg-neutral-900 border border-neutral-800 hover:bg-red-600 hover:border-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Resend Ticket Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
