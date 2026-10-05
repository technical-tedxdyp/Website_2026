type BookingUnavailableNoticeProps = {
    className?: string;
};

export default function BookingUnavailableNotice({ className = '' }: BookingUnavailableNoticeProps) {
    return (
        <section
            role="status"
            aria-live="polite"
            className={`relative overflow-hidden border-2 border-black bg-white p-8 text-center text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${className}`}
        >
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-[#eb0028]" />
            <div
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-black bg-[#eb0028] text-white"
            >
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v1a2.5 2.5 0 0 0 0 5v1a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 14.5v-1a2.5 2.5 0 0 0 0-5v-1Z" />
                    <path strokeLinecap="round" strokeDasharray="1 2" d="M14 7.5v9" />
                </svg>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-[#eb0028]">
                Thank you for the incredible response
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                All tickets are sold out
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                There are no seats remaining for this event. We hope to see you at a future TEDx DYPAKURDI event.
            </p>
        </section>
    );
}
