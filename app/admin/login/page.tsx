'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  // Updated state to represent a generic password/secret
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
6
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      // Sending it as 'password' to match the req.body.password fallback in the backend
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }), 
      });

      const response = await res.json();

      if (res.ok) {
        const token = response.data?.token; 
        
        if (token) {
          localStorage.setItem('adminToken', token);
          router.push('/admin/dashboard');
        } else {
          setError('Authentication succeeded, but no token was returned.');
        }
      } else {
        setError(response.message || 'Invalid admin key or password');
      }
    } catch (err) {
      setError('Connection failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-10 rounded-sm shadow-2xl">
        
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-5xl font-black text-black tracking-tighter">
            TED<span className="text-[#eb0028]">x</span>
          </h1>
          <p className="text-gray-500 tracking-widest text-sm mt-2 uppercase font-semibold">
            Admin Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-[#eb0028] text-[#eb0028] text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="relative">
            {/* Updated labels and placeholders to reflect the flexibility */}
            <label htmlFor="password" className="sr-only">Admin Key / Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Admin Key or Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b-2 border-gray-300 py-3 px-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#eb0028] focus:ring-0 transition-colors bg-transparent text-lg"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#eb0028] hover:bg-[#c2001f] text-white font-bold py-4 rounded-sm uppercase tracking-wider transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}