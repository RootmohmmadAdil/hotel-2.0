'use client';

import { useState } from 'react';
import HotelCard from '@/components/HotelCard';

const HOTELS = [
  { _id: '1', name: 'Taj Palace', city: 'Mumbai', pricePerNight: 250, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
  { _id: '2', name: 'Maharaja Resort', city: 'Goa', pricePerNight: 180, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
  { _id: '3', name: 'Ashoka Heritage', city: 'Delhi', pricePerNight: 150, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80' },
];

export default function Home() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', hotel: '', checkIn: '', checkOut: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.hotel || !form.checkIn || !form.checkOut) {
      alert('Fill all fields');
      return;
    }
    setBookings([...bookings, { ...form, id: Date.now() }]);
    setForm({ name: '', email: '', hotel: '', checkIn: '', checkOut: '' });
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Hotel Booking</h1>
      <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px', marginBottom: '20px', cursor: 'pointer' }}>
        {showForm ? 'Hide' : 'New Booking'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px', borderRadius: '4px' }}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
          <select value={form.hotel} onChange={(e) => setForm({ ...form, hotel: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
            <option value="">Select Hotel</option>
            {HOTELS.map(h => <option key={h._id} value={h.name}>{h.name}</option>)}
          </select>
          <input type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
          <input type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Book</button>
        </form>
      )}

      <h2>Hotels</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {HOTELS.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)}
      </div>

      <h2>Bookings ({bookings.length})</h2>
      {bookings.length === 0 ? <p>No bookings yet</p> : (
        <div>
          {bookings.map(b => (
            <div key={b.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
              <p><strong>{b.name}</strong> - {b.email}</p>
              <p>{b.hotel} ({b.checkIn} to {b.checkOut})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
