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
    <main className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin - Bookings</h1>
        <button onClick={() => router.back()} className="px-4 py-2 bg-gray-500 text-white rounded">← Back</button>
      </div>

      {loading ? <p>Loading...</p> : bookings.length === 0 ? <p>No bookings yet.</p> : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Hotel</th>
                <th className="border p-2 text-left">Guest</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Check-in</th>
                <th className="border p-2 text-left">Check-out</th>
                <th className="border p-2 text-left">Room</th>
                <th className="border p-2 text-left">Guests</th>
                <th className="border p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id.toString()} className="hover:bg-gray-100">
                  <td className="border p-2">{b.hotelName}</td>
                  <td className="border p-2">{b.userName}</td>
                  <td className="border p-2">{b.userEmail}</td>
                  <td className="border p-2">{formatDate(b.checkInDate)}</td>
                  <td className="border p-2">{formatDate(b.checkOutDate)}</td>
                  <td className="border p-2">{b.roomType} ({b.roomNumber})</td>
                  <td className="border p-2">{b.numberOfGuests}</td>
                  <td className="border p-2 font-bold">₹{b.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-gray-600">Total: {bookings.length}</p>
        </>
      )}
    </main>
  );
}
