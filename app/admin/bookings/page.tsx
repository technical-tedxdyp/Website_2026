import React from 'react';

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page || 1;
  let bookings = [];
  let pagination = { total: 0, page: 1, limit: 10, totalPages: 1 };

  try {
    const res = await fetch(`http://localhost:8080/api/admin/bookings?page=${page}`, { 
      cache: 'no-store',
      headers: {
        'Authorization': 'Bearer TEDX_ADMIN_SECRET_KEY' // Hardcoded for demo
      }
    });
    const data = await res.json();
    if (data.success && data.data) {
      bookings = data.data.bookings;
      pagination = data.data.pagination;
    }
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    // Mock data for demo
    bookings = [
      { _id: '1', name: 'John Doe', email: 'john@example.com', ticketCount: 2, totalAmount: 998, bookingStatus: 'PAYMENT_SUCCESS', ticketId: 'TX-12345', createdAt: new Date().toISOString() },
      { _id: '2', name: 'Jane Smith', email: 'jane@example.com', ticketCount: 1, totalAmount: 499, bookingStatus: 'PENDING', ticketId: 'TX-12346', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { _id: '3', name: 'Alex Johnson', email: 'alex@example.com', ticketCount: 3, totalAmount: 1497, bookingStatus: 'CHECKED_IN', ticketId: 'TX-12347', createdAt: new Date(Date.now() - 7200000).toISOString() },
    ];
    pagination = { total: 3, page: 1, limit: 10, totalPages: 1 };
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Bookings</h2>
          <p className="text-gray-400">Manage all event ticket bookings and attendees.</p>
        </div>
        
        {/* Search and Filter actions (UI only for now) */}
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search by name, email or ticket ID..." 
            className="bg-neutral-900 border border-neutral-800 text-white rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:border-red-600 transition"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">
            Search
          </button>
        </div>
      </div>

      <div className="bg-black border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-900 text-gray-400 text-sm border-b border-neutral-800">
                <th className="p-5 font-medium">Ticket ID</th>
                <th className="p-5 font-medium">Attendee Details</th>
                <th className="p-5 font-medium">Qty</th>
                <th className="p-5 font-medium">Amount</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-sm">
              {bookings.length > 0 ? bookings.map((booking: any) => (
                <tr key={booking._id} className="hover:bg-neutral-900/40 transition">
                  <td className="p-5 font-mono text-gray-300">{booking.ticketId || 'N/A'}</td>
                  <td className="p-5">
                    <div className="font-medium text-white">{booking.name}</div>
                    <div className="text-gray-500 text-xs mt-1">{booking.email}</div>
                  </td>
                  <td className="p-5 text-gray-300">{booking.ticketCount}</td>
                  <td className="p-5 text-gray-300">₹{booking.totalAmount}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.bookingStatus === 'PAYMENT_SUCCESS' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      booking.bookingStatus === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      booking.bookingStatus === 'CHECKED_IN' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {booking.bookingStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-gray-400 hover:text-white px-3 py-1 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800 transition">
                      View
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-900/30">
          <div className="text-sm text-gray-500">
            Showing page <span className="font-medium text-white">{pagination.page}</span> of <span className="font-medium text-white">{pagination.totalPages}</span> ({pagination.total} total)
          </div>
          <div className="flex gap-2">
            <button 
              disabled={pagination.page <= 1}
              className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-gray-400 hover:text-white hover:bg-neutral-800 disabled:opacity-50 transition"
            >
              Previous
            </button>
            <button 
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-gray-400 hover:text-white hover:bg-neutral-800 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
