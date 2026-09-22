import React from 'react';
import Image from 'next/image';
import PublicLayout from '../../components/PublicLayout';

export default async function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  let ticket: any = null;

  try {
    const res = await fetch(`http://localhost:8080/api/ticket/${ticketId}`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.data) {
      ticket = data.data;
    }
  } catch (error) {
    console.log("Failed to fetch ticket:", error);
    ticket = {
      ticketId: ticketId,
      name: "John Doe",
      email: "johndoe@example.com",
      ticketCount: 1,
      totalAmount: 499,
      bookingStatus: "PAYMENT_SUCCESS",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + ticketId,
      pdfUrl: "#",
      ticketGeneratedAt: new Date().toISOString(),
      checkedInAt: null,
      selectedSessions: [
        { title: "Morning Session", day: 1, timeLabel: "09:00 AM - 01:00 PM IST" }
      ]
    };
  }

  if (!ticket) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="text-center font-pixel text-[var(--brand-red)] uppercase tracking-widest text-xl">
            Ticket Not Found
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-black flex flex-col items-center py-24 px-6 md:px-24 border-t-2 border-neutral-900">

        <div className="w-full max-w-4xl text-center mb-16">
          <h3 className="font-pixel text-[var(--brand-red)] uppercase tracking-[0.3em] mb-4">Admit One</h3>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Your <span className="text-[var(--brand-red)]">Ticket</span>
          </h1>
          <p className="font-pixel text-gray-400 lowercase">
            present this mosaic fragment at the registration desk.
          </p>
        </div>

        {/* Ticket Container */}
        <div className="w-full max-w-4xl bg-black border-[4px] border-[var(--cream)] flex flex-col md:flex-row relative shadow-[12px_12px_0px_0px_#ff3300]">

          {/* Left Block: Info */}
          <div className="flex-1 p-8 md:p-12 md:border-r-[4px] border-[var(--cream)] border-b-[4px] md:border-b-0">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-12">
              TEDx DYPAKURDI
            </h2>

            <div className="space-y-8 font-pixel uppercase tracking-widest text-sm">
              <div className="border-l-2 border-[var(--brand-red)] pl-4">
                <span className="block text-gray-500 mb-1">Attendee Name /</span>
                <span className="font-sans font-bold text-white text-xl tracking-normal">{ticket.name}</span>
              </div>

              <div className="border-l-2 border-[var(--brand-red)] pl-4">
                <span className="block text-gray-500 mb-1">Email /</span>
                <span className="text-white font-mono lowercase">{ticket.email}</span>
              </div>

              <div className="border-l-2 border-[var(--brand-red)] pl-4">
                <span className="block text-gray-500 mb-1">Sessions /</span>
                {ticket.selectedSessions?.map((session: any, idx: number) => (
                  <div key={idx} className="mb-2">
                    <span className="font-sans font-bold text-white text-base tracking-normal block">{session.title}</span>
                    <span className="text-[var(--brand-red)]">{session.timeLabel} • Day {session.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: QR and Status */}
          <div className="w-full md:w-80 bg-[var(--cream)] flex flex-col items-center justify-between p-8">
            <div className="w-full text-center border-b-2 border-black pb-6 mb-6">
              <span className="block font-pixel text-black font-bold uppercase tracking-widest text-xs mb-2">Status</span>
              <span className={`inline-block font-black text-2xl uppercase tracking-tighter ${ticket.checkedInAt ? 'text-blue-600' : 'text-[var(--brand-red)]'}`}>
                {ticket.checkedInAt ? 'CHECKED IN' : 'VALID'}
              </span>
            </div>

            <div className="bg-white p-4 border-[4px] border-black w-48 h-48 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {ticket.qrCode ? (
                <Image
                  src={ticket.qrCode.startsWith('http') ? ticket.qrCode : `data:image/png;base64,${ticket.qrCode}`}
                  alt="QR Code"
                  fill
                  className="object-contain p-2"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center font-pixel text-gray-400 text-xs text-center">
                  NO QR
                </div>
              )}
            </div>

            <div className="mt-8 text-center w-full">
              <span className="block font-pixel text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">Ticket ID</span>
              <span className="font-mono font-bold text-black text-lg bg-black/10 px-2 py-1">{ticket.ticketId}</span>
            </div>
          </div>

        </div>

        {/* Download Action */}
        <div className="mt-12">
          {ticket.pdfUrl && ticket.pdfUrl !== '#' ? (
            <a
              href={ticket.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-white hover:text-[var(--brand-red)] uppercase tracking-widest border-b-2 border-dashed border-gray-600 hover:border-[var(--brand-red)] pb-1 transition-colors"
            >
              Download PDF Version →
            </a>
          ) : (
            <p className="font-pixel text-gray-600 uppercase tracking-widest text-xs">PDF generation pending...</p>
          )}
        </div>

      </div>
    </PublicLayout>
  );
}
