'use client';

import Script from 'next/script';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { Evening_Seesion, Full_Day_Session, Morning_Session } from '@/lib/const';

const BOOKING_ENABLED = (process.env.BOOKING_ENABLED || 'true') === 'true';

const TICKET_TIERS = [
    { id: Morning_Session, name: 'Morning Session', price: '₹79', numericPrice: 79 },
    { id: Evening_Seesion, name: 'Evening Session', price: '₹79', numericPrice: 79 },
    { id: Full_Day_Session, name: 'Full Day', price: '₹99', numericPrice: 99 },
];

export default function BookingDrawer() {
    const router = useRouter();
    const { isOpen, selectedTier, closeBooking, setSelectedTier } = useBooking();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeBooking();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeBooking]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!BOOKING_ENABLED) return;

        setError('');
        setSuccessMsg('');

        if (!formData.name.trim()) {
            setError('Please enter your full name.');
            return;
        }

        const emailTrimmed = formData.email.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
            setError('Please enter a valid email address (e.g. name@example.com).');
            return;
        }

        const rawPhone = formData.phone.trim();
        const digitsOnly = rawPhone.replace(/\D/g, '');
        if (!/^\d{10}$/.test(rawPhone) && !/^\d{10}$/.test(digitsOnly)) {
            setError('Please enter a valid 10-digit mobile number without +91 or country code.');
            return;
        }

        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const currentTier = TICKET_TIERS.find((t) => t.name === selectedTier) || TICKET_TIERS[1];

            // Attempt to call backend order creation
            const res = await fetch(`${API_URL}/booking/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: emailTrimmed,
                    phone: digitsOnly,
                    ticketCount: 1,
                    selectedSessions: [String(currentTier.id)],
                }),
            }).catch(() => null);

            if (res && res.ok) {
                const response = await res.json();
                const { amount, currency, orderId, key, bookingId } = response.data;

                if (typeof window !== 'undefined' && (window as any).Razorpay && key) {
                    const options = {
                        key: key,
                        amount: amount,
                        currency: currency || 'INR',
                        name: 'TEDx DYPAKURDI',
                        description: `${selectedTier} Ticket`,
                        order_id: orderId,
                        handler: async function (paymentResponse: any) {
                            try {
                                const verifyRes = await fetch(`${API_URL}/payment/verify`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        bookingId: bookingId,
                                        razorpayOrderId: paymentResponse.razorpay_order_id,
                                        razorpayPaymentId: paymentResponse.razorpay_payment_id,
                                        razorpaySignature: paymentResponse.razorpay_signature,
                                    }),
                                });

                                const verifyData = await verifyRes.json();
                                if (verifyRes.ok && verifyData.success) {
                                    closeBooking();
                                    router.push(`/success?bookingId=${bookingId}`);
                                } else {
                                    setError(verifyData.message || 'Payment verification failed.');
                                }
                            } catch {
                                setError('Server error during payment verification.');
                            }
                        },
                        prefill: {
                            name: formData.name,
                            email: formData.email,
                            contact: formData.phone,
                        },
                        theme: { color: '#EB0028' },
                    };

                    const rzp = new (window as any).Razorpay(options);
                    rzp.on('payment.failed', function () {
                        setError('Payment cancelled or failed.');
                    });
                    rzp.open();
                    setLoading(false);
                    return;
                }
            }

            // Fallback confirmation message if standalone frontend
            setTimeout(() => {
                setSuccessMsg(`Booking request received for ${formData.name} (${selectedTier})!`);
                setLoading(false);
            }, 700);

        } catch (err: any) {
            setError(err?.message || 'Unable to process booking right now. Please try again.');
            setLoading(false);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {/* Backdrop */}
            <div
                onClick={closeBooking}
                aria-hidden="true"
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Slide-over Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] md:max-w-[450px] bg-[#EDEBE8] z-50 shadow-2xl flex flex-col border-l-2 border-black transition-transform duration-300 ease-in-out font-sans ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Red Header Bar */}
                <div className="bg-[#EB0028] text-white p-6 pb-7 flex items-start justify-between border-b-2 border-black">
                    <div>
                        <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/90 mb-1">
                            CHECKOUT
                        </span>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            Book your seat
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={closeBooking}
                        className="w-10 h-10 border border-white flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
                        aria-label="Close booking checkout"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth="2.5"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {!BOOKING_ENABLED && (
                    <div className="px-6 pt-6 md:px-8" role="status">
                        <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                                TICKET DESK / UPDATE
                            </div>
                            <div className="p-5">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center border-2 border-black bg-[#EB0028] text-white">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M12 8v4m0 4h.01M10.3 3.9 1.8 18.6A1.6 1.6 0 0 0 3.2 21h17.6a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black leading-tight text-black">
                                    Booking opens tomorrow
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                                    Ticket bookings are closed for today. From tomorrow, book your ticket on this website or visit the ticketing canopies on campus.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Body Content */}
                {BOOKING_ENABLED && <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col justify-between overflow-y-auto p-6 md:p-8 space-y-6"
                >
                    <div className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-100 border-2 border-[#EB0028] text-red-900 text-xs font-bold uppercase tracking-wider animate-slide-up-fade">
                                {error}
                            </div>
                        )}

                        {successMsg && (
                            <div className="p-3 bg-green-100 border-2 border-green-700 text-green-900 text-xs font-bold uppercase tracking-wider animate-slide-up-fade">
                                {successMsg}
                            </div>
                        )}

                        {/* Ticket Type Section */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-3">
                                TICKET TYPE
                            </label>

                            <div className="space-y-3">
                                {TICKET_TIERS.map((tier) => {
                                    const isSelected = selectedTier === tier.name;
                                    return (
                                        <button
                                            type="button"
                                            key={tier.id}
                                            onClick={() => setSelectedTier(tier.name)}
                                            className={`w-full p-4 flex items-center justify-between border-2 border-black text-left transition-all cursor-pointer ${isSelected
                                                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-neutral-50'
                                                }`}
                                        >
                                            <span className="font-bold text-base md:text-lg">
                                                {tier.name}
                                            </span>
                                            <span className="font-bold text-base md:text-lg">
                                                {tier.price}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">
                                FULL NAME
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                                className="w-full bg-white border-2 border-black p-3.5 px-4 text-black text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@email.com"
                                required
                                className="w-full bg-white border-2 border-black p-3.5 px-4 text-black text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <p className="text-[11px] text-neutral-600 mt-1.5 leading-snug">
                                <span className="text-brand font-bold">Note:</span> Please enter a valid email address. Your tickets and receipts will be sent here.
                            </p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-2">
                                PHONE
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                                maxLength={10}
                                pattern="[0-9]{10}"
                                required
                                className="w-full bg-white border-2 border-black p-3.5 px-4 text-black text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <p className="text-[11px] text-neutral-600 mt-1.5 leading-snug">
                                <span className="text-brand font-bold">Note:</span> Please enter only your 10-digit mobile number without +91 or country prefix.
                            </p>
                        </div>
                    </div>

                    {/* Confirm Booking CTA */}
                    <div className="pt-4 pb-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#EB0028] hover:bg-red-700 text-white font-black text-sm md:text-base py-4 uppercase tracking-[0.2em] border-2 border-black transition-all duration-200 ease-out shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    PROCESSING...
                                </>
                            ) : (
                                'CONFIRM BOOKING'
                            )}
                        </button>
                    </div>
                </form>}
            </div>
        </>
    );
}
