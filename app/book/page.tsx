// app/book/page.tsx
'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

export default function UserFriendlyBooking() {
  const router = useRouter();

  // Hardcoded list of sessions matching your request
  // IMPORTANT: Replace the 'id' values with the actual MongoDB _id strings from your database
  const availableSessions = [
    { id: '64a7f9b8e1234567890abcde', title: 'Morning Session' },
    { id: '64a7f9b8e1234567890abcdf', title: 'Evening Session' },
    { id: '64a7f9b8e1234567890abcdg', title: 'Full Day' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketCount: 1,
    sessionId: availableSessions[0].id, // Defaults to the Morning Session ID
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      // 1. Create the Order
      const res = await fetch(`${API_URL}/booking/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          ticketCount: Number(formData.ticketCount),
          selectedSessions: [formData.sessionId], 
        }),
      });

      const response = await res.json();

      if (!res.ok) throw new Error(response.message || 'Failed to create order');

      const { amount, currency, orderId, key, bookingId } = response.data;

      // 2. Open Razorpay
      const options = {
        key: key, 
        amount: amount, 
        currency: currency,
        name: "TEDx Event",
        order_id: orderId,
        handler: async function (paymentResponse: any) {
          
          // 3. Verify Payment with your backend immediately after Razorpay succeeds
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
              // Redirect to success page on completion
              router.push(`/success?bookingId=${bookingId}`);
            } else {
              setError(verifyData.message || 'Payment verification failed.');
            }
          } catch (verifyErr) {
            setError('Server error during verification. Check your email for ticket status.');
          }
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#eb0028" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function () {
        setError('Payment failed or was cancelled.');
      });
      rzp.open();

    } catch (err: any) {
      setError(err.message || 'Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-xl mx-auto">
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
                className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#eb0028]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone</label>
                <input
                  name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                  className="w-full bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:border-[#eb0028]"
                />
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
      </div>
    </div>
  );
}