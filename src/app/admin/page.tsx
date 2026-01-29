'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IBooking } from '@/models/Booking';

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => data.success && setBookings(data.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string | Date | undefined) => {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  const calcNights = (checkIn: string, checkOut: string) => 
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Admin - All Bookings</h1>
        <button onClick={() => router.back()} style={{ padding: '10px 15px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <p><strong>Total Bookings:</strong> {bookings.length} | <strong>Total Revenue:</strong> ₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #ccc' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0066cc', color: 'white' }}>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Hotel</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Guest</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Email</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Room</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Check-in</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Check-out</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: any) => (
                  <tr key={b._id?.toString?.()} style={{ backgroundColor: '#f9f9f9' }}>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.hotelName}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.userName}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.userEmail}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{b.roomType} #{b.roomNumber}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{formatDate(b.checkInDate)}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{formatDate(b.checkOutDate)}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>₹{b.totalPrice?.toLocaleString?.('en-IN') || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
