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

  const formatDate = (d: string) => new Date(d).toLocaleDateString();
  const calcNights = (checkIn: string, checkOut: string) => 
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <main className="p-4 max-w-full">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      <button onClick={() => router.back()} className="mb-4 px-3 py-2 bg-gray-700 text-white rounded">← Back</button>

      {loading ? <p>Loading...</p> : bookings.length === 0 ? <p>No bookings.</p> : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2 text-left">Hotel</th>
                  <th className="border p-2 text-left">Guest</th>
                  <th className="border p-2 text-left">Room</th>
                  <th className="border p-2 text-left">Check-in</th>
                  <th className="border p-2 text-left">Check-out</th>
                  <th className="border p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id.toString()} className="border-b">
                    <td className="border p-2">{b.hotelName}</td>
                    <td className="border p-2">{b.userName}</td>
                    <td className="border p-2">{b.roomType}</td>
                    <td className="border p-2">{formatDate(b.checkInDate)}</td>
                    <td className="border p-2">{formatDate(b.checkOutDate)}</td>
                    <td className="border p-2">₹{b.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-gray-600">Total Bookings: {bookings.length}</p>
        </>
      )}
    </main>
  );
}
