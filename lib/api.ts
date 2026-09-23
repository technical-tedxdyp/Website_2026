// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  getSessions: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/session`);
      if (!res.ok) return { sessions: [] };
      return res.json();
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      return { sessions: [] };
    }
  },
  getSessionById: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/session/${id}`);
    return res.json();
  },
  createBookingOrder: async (bookingData: any) => {
    const res = await fetch(`${API_BASE_URL}/booking/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    return res.json();
  }
};