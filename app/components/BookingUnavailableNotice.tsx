type BookingUnavailableNoticeProps = {
    className?: string;
};

export default function BookingUnavailableNotice({ className = '' }: BookingUnavailableNoticeProps) {
    return (
        <section
            role="status"
            aria-live="polite"
            className={`border-2 border-black bg-white p-6 text-black ${className}`}
        >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#eb0028]">
                Booking temporarily paused
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
                We&apos;ll be back soon.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                Booking will resume in 30 minutes. Please check back soon.
            </p>
        </section>
    );
}
