// lib/admin-api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const adminApi = {
  login: async (adminKey: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The backend accepts adminKey, secretKey, or password
        body: JSON.stringify({ adminKey }), 
      });
      return await res.json();
    } catch (error) {
      console.error("Login request failed:", error);
      return { success: false, message: "Network error" };
    }
  }
};