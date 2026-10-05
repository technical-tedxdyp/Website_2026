'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import PaymentRedirectLoader, { PaymentStep } from '../components/PaymentRedirectLoader';
import BookingUnavailableNotice from '../components/BookingUnavailableNotice';
import { Morning_Session, Evening_Seesion, Full_Day_Session } from '@/lib/const';

type PaymentResponse = {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
};

type VerifyResponse = {
    success?: boolean;
    message?: string;
};

type CreateOrderResponse = {
    message?: string;
    data: {
        amount: number;
        currency: string;
        orderId: string;
        key: string;
        bookingId: string;
        paymentDisabled?: boolean;
    };
};

type RazorpayOptions = {
    key: string;
    amount: number;
    currency: string;
    name: string;
    order_id: string;
    handler: (paymentResponse: PaymentResponse) => Promise<void>;
    prefill: { name: string; email: string; contact: string };
    theme: { color: string };
};

type RazorpayInstance = {
    on: (event: string, handler: () => void) => void;
    open: () => void;
};

type WindowWithRazorpay = Window & {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
};

export default function UserFriendlyBooking() {
    const router = useRouter();
    const bookingEnabled = process.env.BOOKING_ENABLED !== 'false';

    const availableSessions = [
        { id: Morning_Session, title: 'Morning Session' },
        { id: Evening_Seesion, title: 'Evening Session' },
        { id: Full_Day_Session, title: 'Full Day' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        ticketCount: 1,
        sessionId: availableSessions[0].id,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Intermediate redirecting loader state
    const [paymentProcessing, setPaymentProcessing] = useState<{
        isOpen: boolean;
        step: PaymentStep;
        bookingId?: string;
        errorMessage?: string;
        lastPaymentResponse?: PaymentResponse;
    }>({
        isOpen: false,
        step: 'verifying',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const verifyAndRedirect = async (paymentResponse: PaymentResponse, currentBookingId: string) => {
        setPaymentProcessing({
            isOpen: true,
            step: 'verifying',
            bookingId: currentBookingId,
            lastPaymentResponse: paymentResponse,
        });

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

        try {
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: currentBookingId,
                    razorpayOrderId: paymentResponse.razorpay_order_id,
                    razorpayPaymentId: paymentResponse.razorpay_payment_id,
                    razorpaySignature: paymentResponse.razorpay_signature,
                }),
            });

            const verifyData: VerifyResponse = await verifyRes.json().catch((): VerifyResponse => ({}));

            if (verifyRes.ok && (verifyData.success !== false)) {
                // Step 2: Generating ticket
                setPaymentProcessing((prev) => ({ ...prev, step: 'generating' }));
                await new Promise((resolve) => setTimeout(resolve, 800));

                // Step 3: Redirecting
                setPaymentProcessing((prev) => ({ ...prev, step: 'redirecting' }));
                await new Promise((resolve) => setTimeout(resolve, 700));

                router.push(`/success?bookingId=${currentBookingId}`);
            } else {
                setPaymentProcessing((prev) => ({
                    ...prev,
                    step: 'error',
                    errorMessage: verifyData?.message || 'Payment verification could not be confirmed. Check your email for ticket status or try again.',
                }));
            }
        } catch {
            setPaymentProcessing((prev) => ({
                ...prev,
                step: 'error',
                errorMessage: 'Connection timed out during verification. If money was deducted, your ticket is being processed and will be sent to your email.',
            }));
        }
    };

    const handleCreateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

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

            // 1. Create the Order
            const res = await fetch(`${API_URL}/booking/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: emailTrimmed,
                    phone: digitsOnly,
                    ticketCount: Number(formData.ticketCount),
                    selectedSessions: [formData.sessionId],
                }),
            });

            const response: CreateOrderResponse = await res.json();

            if (!res.ok) throw new Error(response.message || 'Failed to create order');

            const { amount, currency, orderId, key, bookingId, paymentDisabled } = response.data;

            if (paymentDisabled || !key || !orderId) {
                setError('Payments are temporarily disabled while the payment gateway is being configured.');
                return;
            }

            // 2. Open Razorpay
            const options = {
                key: key,
                amount: amount,
                currency: currency,
                name: "TEDx Event",
                order_id: orderId,
                handler: async function (paymentResponse: PaymentResponse) {
                    await verifyAndRedirect(paymentResponse, bookingId);
                },
                prefill: { name: formData.name, email: formData.email, contact: formData.phone },
                theme: { color: "#eb0028" },
            };

            const RazorpayCtor = (window as WindowWithRazorpay).Razorpay;
            if (!RazorpayCtor) {
                setError('The payment gateway is still loading. Please try again.');
                return;
            }

            const rzp = new RazorpayCtor(options);
            rzp.on('payment.failed', function () {
                setError('Payment failed or was cancelled.');
            });
            rzp.open();

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error connecting to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
            {bookingEnabled && <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />}

            <div className="max-w-xl mx-auto">
                {!bookingEnabled ? (
                    <BookingUnavailableNotice className="mt-10" />
                ) : (
                    <>
                        <div className="mb-10">
                            <h1 className="text-4xl font-black tracking-tighter mb-2">
                                Secure Your <span className="text-[#eb0028]">Seat</span>
                            </h1>
                        </div>

                        <form onSubmit={handleCreateOrder} className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm space-y-6">
                    {error && <div className="p-4 bg-red-950/30 border-l-4 border-[#eb0028] text-red-200 text-sm font-medium">{error}</div>}

                    <div className="space-y-4">



                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                            <input
                                name="name" type="text" required value={formData.name} onChange={handleChange}
                                className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#eb0028]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                            <input
                                name="email" type="email" required value={formData.email} onChange={handleChange}
                                placeholder="you@email.com"
                                className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#eb0028]"
                            />
                            <p className="text-[11px] text-zinc-400 mt-1.5 leading-snug">
                                <span className="text-[#eb0028] font-bold">Note:</span> Please enter a valid email address. Your tickets and receipts will be sent here.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    maxLength={10}
                                    pattern="[0-9]{10}"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#eb0028]"
                                />
                                <p className="text-[11px] text-zinc-400 mt-1.5 leading-snug">
                                    <span className="text-[#eb0028] font-bold">Note:</span> Please enter only your 10-digit mobile number without +91 or country prefix.
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Tickets</label>
                                <input
                                    name="ticketCount" type="number" min="1" required value={formData.ticketCount} onChange={handleChange}
                                    className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#eb0028]"
                                />
                            </div>
                        </div>

                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#eb0028] hover:bg-[#c2001f] text-white font-bold py-5 mt-4 rounded-sm uppercase tracking-widest transition-colors disabled:opacity-50">
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                        </form>
                    </>
                )}
            </div>

            {/* Intermediate Processing / Redirecting Interface */}
            <PaymentRedirectLoader
                isOpen={paymentProcessing.isOpen}
                step={paymentProcessing.step}
                bookingId={paymentProcessing.bookingId}
                errorMessage={paymentProcessing.errorMessage}
                onRetry={() => {
                    if (paymentProcessing.lastPaymentResponse && paymentProcessing.bookingId) {
                        verifyAndRedirect(paymentProcessing.lastPaymentResponse, paymentProcessing.bookingId);
                    }
                }}
                onClose={() => {
                    setPaymentProcessing((prev) => ({ ...prev, isOpen: false }));
                    if (paymentProcessing.bookingId) {
                        router.push(`/success?bookingId=${paymentProcessing.bookingId}`);
                    }
                }}
            />
        </div>
    );
}
