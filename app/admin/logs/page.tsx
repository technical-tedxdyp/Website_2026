import React from 'react';

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page || 1;
  let logs = [];
  let pagination = { total: 0, page: 1, limit: 15, totalPages: 1 };

  try {
    const res = await fetch(`http://localhost:8080/api/admin/logs?page=${page}`, { 
      cache: 'no-store',
      headers: {
        'Authorization': 'Bearer TEDX_ADMIN_SECRET_KEY' // Hardcoded for demo
      }
    });
    const data = await res.json();
    if (data.success && data.data) {
      logs = data.data.logs;
      pagination = data.data.pagination;
    }
  } catch (error) {
    console.error("Failed to fetch entry logs:", error);
    // Mock data for demo
    logs = [
      { _id: '1', ticketId: 'TX-12347', action: 'ENTRY', scannedBy: 'Gate A Scanner', scannedAt: new Date(Date.now() - 500000).toISOString(), remarks: 'Initial check-in', booking: { name: 'Alex Johnson' }, session: { title: 'Morning Session' } },
      { _id: '2', ticketId: 'TX-12342', action: 'ENTRY', scannedBy: 'Gate B Scanner', scannedAt: new Date(Date.now() - 1500000).toISOString(), remarks: 'Initial check-in', booking: { name: 'Sarah Connor' }, session: { title: 'Evening Session' } },
      { _id: '3', ticketId: 'TX-12349', action: 'DENIED', scannedBy: 'Gate A Scanner', scannedAt: new Date(Date.now() - 3600000).toISOString(), remarks: 'Ticket already checked in', booking: { name: 'Mike Ross' }, session: { title: 'Morning Session' } },
    ];
    pagination = { total: 3, page: 1, limit: 15, totalPages: 1 };
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Entry Logs</h2>
          <p className="text-gray-400">Real-time history of all ticket scans and check-ins.</p>
        </div>
        
        {/* Filter actions (UI only for now) */}
        <div className="flex items-center gap-3">
          <select className="bg-neutral-900 border border-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 transition">
            <option value="">All Actions</option>
            <option value="ENTRY">Entry (Success)</option>
            <option value="DENIED">Denied</option>
          </select>
          <button className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white px-4 py-2 rounded-lg transition">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-black border border-neutral-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-900 text-gray-400 text-sm border-b border-neutral-800">
                <th className="p-5 font-medium">Timestamp</th>
                <th className="p-5 font-medium">Attendee / Ticket</th>
                <th className="p-5 font-medium">Session</th>
                <th className="p-5 font-medium">Action</th>
                <th className="p-5 font-medium">Scanned By</th>
                <th className="p-5 font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-sm">
              {logs.length > 0 ? logs.map((log: any) => (
                <tr key={log._id} className="hover:bg-neutral-900/40 transition">
                  <td className="p-5 text-gray-400 whitespace-nowrap">
                    {new Date(log.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    <div className="text-xs text-gray-600 mt-1">{new Date(log.scannedAt).toLocaleDateString()}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-medium text-white">{log.booking?.name || 'Unknown'}</div>
                    <div className="text-gray-500 font-mono text-xs mt-1">{log.ticketId}</div>
                  </td>
                  <td className="p-5 text-gray-300">{log.session?.title || 'N/A'}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      log.action === 'ENTRY' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      log.action === 'DENIED' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-5 text-gray-400">{log.scannedBy}</td>
                  <td className="p-5 text-gray-500 truncate max-w-[200px]" title={log.remarks}>{log.remarks}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    No entry logs found matching your criteria.
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
