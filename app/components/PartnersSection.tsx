const PARTNERS = ['Partner One', 'Partner Two', 'Partner Three', 'Partner Four', 'Partner Five', 'Partner Six'];

export default function PartnersSection() {
    return (
        <section id="partners" className="bg-black text-white px-6 md:px-24 py-20">
            <p className="font-pixel text-neutral-500 uppercase tracking-[0.3em] mb-10">Partners & Sponsors</p>
            <div className="grid grid-cols-2 md:grid-cols-6 border border-neutral-700 divide-x divide-y md:divide-y-0 divide-neutral-700">
                {PARTNERS.map((name) => (
                    <div key={name} className="h-24 flex items-center justify-center text-sm text-neutral-300">
                        {name}
                    </div>
                ))}
            </div>

            <div className="mt-20 pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between gap-10">
                <div>
                    <p className="text-2xl font-black">
                        <span className="text-brand">TED</span>x
                    </p>
                    <p className="text-sm text-neutral-400 mt-4 max-w-sm">
                        Meandering in the Mosaic · TBA · 2026<br />
                        Venue Name, Full venue address goes here
                    </p>
                    <p className="text-xs text-neutral-500 mt-4 max-w-md">
                        This independent TEDx event is operated under license from TED.
                    </p>
                </div>
                <div className="flex gap-3 items-start">
                    {[
                        { label: 'Instagram', href: '#', icon: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 4.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zM17.5 7a1 1 0 11-1 1 1 1 0 011-1z' },
                        { label: 'LinkedIn', href: '#', icon: 'M4 9h4v11H4zM6 3a2 2 0 11-2 2 2 2 0 012-2zM10 9h4v1.6a4.3 4.3 0 013.8-1.8c4 0 4.2 2.6 4.2 6V20h-4v-5.2c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7V20h-4z' },
                        { label: 'X', href: '#', icon: 'M4 4l7.3 8.8L4.4 20h2.6l5.3-5.9L16.8 20H20l-7.6-9.2L19.4 4h-2.6l-4.9 5.4L7.2 4z' },
                        { label: 'Email', href: 'mailto:hello@tedxdypakurdi.com', icon: 'M3 6h18v12H3zm0 0l9 7 9-7' },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            aria-label={social.label}
                            className="w-10 h-10 border border-neutral-600 flex items-center justify-center hover:border-white hover:text-white text-neutral-300 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d={social.icon} />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
