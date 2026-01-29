'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { IHotel } from '@/models/Hotel';
import { IRoom } from '@/models/Room';

export default function HotelDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<{ hotel: IHotel; rooms: IRoom[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', checkIn: '', checkOut: '', guests: 1 });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/hotels/${params.id}`)
      .then(res => res.json())
      .then(result => result.success && setData(result.data))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleBookRoom = (room: IRoom) => {
    if (!form.checkIn || !form.checkOut || !form.name || !form.email) {
      return alert('Please fill all fields');
    }

    setBookingLoading(true);
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotelName: data?.hotel.name,
        userName: form.name,
        userEmail: form.email,
        checkInDate: form.checkIn,
        checkOutDate: form.checkOut,
        roomType: room.roomType,
        roomNumber: room.roomNumber,
        roomPrice: room.price,
        numberOfGuests: form.guests,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          alert(`Booking confirmed! Check ${form.email}`);
          setForm({ name: '', email: '', checkIn: '', checkOut: '', guests: 1 });
        } else alert('Booking failed: ' + result.error);
      })
      .finally(() => setBookingLoading(false));
  };

  if (loading) return <main className="p-8"><p>Loading...</p></main>;
  if (!data) return <main className="p-8"><p>Hotel not found</p><button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Go Back</button></main>;

  const { hotel, rooms } = data;

  return (
    <main className="p-8">
      <button onClick={() => router.back()} className="mb-6 px-4 py-2 bg-gray-500 text-white rounded">← Back</button>

      <div className="mb-8">
        <div className="relative h-96 w-full mb-6">
          <Image src={hotel.image} alt={hotel.name} fill className="object-cover rounded-lg" />
        </div>
        <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
        <p className="text-gray-600 mb-2">📍 {hotel.city}</p>
        {hotel.rating && <p className="text-yellow-500 text-lg mb-4">⭐ {hotel.rating} / 5</p>}
        {hotel.description && <p className="text-gray-700 mb-4">{hotel.description}</p>}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded-lg" placeholder="Your Name" />
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="px-3 py-2 border rounded-lg" placeholder="Email" />
          <input type="date" value={form.checkIn} onChange={e => setForm({...form, checkIn: e.target.value})} className="px-3 py-2 border rounded-lg" />
          <input type="date" value={form.checkOut} onChange={e => setForm({...form, checkOut: e.target.value})} className="px-3 py-2 border rounded-lg" />
          <select value={form.guests} onChange={e => setForm({...form, guests: +e.target.value})} className="px-3 py-2 border rounded-lg">
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms?.length ? rooms.map(room => (
            <div key={room._id.toString()} className="border rounded-lg p-4 hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">{room.roomType}</h3>
              <p className="text-gray-600 mb-2">Room #{room.roomNumber}</p>
              <p className="text-gray-700 mb-2">Capacity: {room.capacity} guests</p>
              <p className="text-2xl font-bold text-blue-600 mb-3">₹{room.price} per night</p>
              <button
                onClick={() => handleBookRoom(room)}
                disabled={!room.available || bookingLoading}
                className={`w-full py-2 rounded-lg font-semibold text-white ${room.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                {room.available ? (bookingLoading ? 'Booking...' : 'Book Now') : 'Not Available'}
              </button>
            </div>
          )) : <p className="text-gray-600">No rooms available</p>}
        </div>
      </div>
    </main>
  );
}
