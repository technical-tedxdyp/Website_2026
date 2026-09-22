import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-neutral-800 text-white flex flex-col">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-center md:justify-start">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight">
              TEDx <span className="text-red-600">Admin</span>
            </h1>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
            Dashboard
          </Link>
          <Link href="/admin/bookings" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-neutral-900 hover:text-white transition">
            Bookings
          </Link>
          {/* <Link href="/admin/scanner" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-neutral-900 hover:text-white transition">
            QR Scanner
          </Link> */}
          <Link href="/admin/logs" className="block px-4 py-3 rounded-lg text-gray-400 hover:bg-neutral-900 hover:text-white transition">
            Entry Logs
          </Link>
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <button className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white flex items-center justify-center border border-neutral-800 rounded-lg hover:bg-neutral-900 transition">
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-neutral-950 text-white">
        {children}
      </main>
    </div>
  );
}
