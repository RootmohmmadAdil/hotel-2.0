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
    // Validate required fields
    if (!form.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!form.email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!form.checkIn) {
      alert('Please select a check-in date');
      return;
    }
    if (!form.checkOut) {
      alert('Please select a check-out date');
      return;
    }

    // Validate dates
    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(form.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert('Check-in date cannot be in the past');
      return;
    }
    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Validate guest count
    if (form.guests < 1 || form.guests > 6) {
      alert('Number of guests must be between 1 and 6');
      return;
    }

    // Validate guest capacity
    if (form.guests > room.capacity) {
      alert(`This room can accommodate maximum ${room.capacity} guest${room.capacity > 1 ? 's' : ''}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address');
      return;
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

  if (loading) return <main style={{ padding: '20px' }}><p>Loading...</p></main>;
  if (!data) return <main style={{ padding: '20px' }}><p>Hotel not found</p><button onClick={() => router.back()} style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Go Back</button></main>;

  const { hotel, rooms } = data;

  return (
    <main style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => router.back()} style={{ marginBottom: '20px', padding: '8px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>← Back</button>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', height: '300px', width: '100%', marginBottom: '15px', borderRadius: '4px', overflow: 'hidden' }}>
          <Image src={hotel.image} alt={hotel.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>{hotel.name}</h1>
        <p style={{ color: '#555', marginBottom: '8px' }}><strong>City:</strong> {hotel.city}</p>
        {hotel.rating && <p style={{ color: '#0066cc', fontWeight: 'bold', marginBottom: '8px' }}>Rating: {hotel.rating}/5</p>}
      </div>

      <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Booking Details</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Your Name *</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} placeholder="Enter your full name" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Email Address *</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} placeholder="your.email@example.com" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Check-in Date *</label>
          <input type="date" value={form.checkIn} onChange={e => setForm({...form, checkIn: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Check-out Date *</label>
          <input type="date" value={form.checkOut} onChange={e => setForm({...form, checkOut: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Number of Guests *</label>
          <select value={form.guests} onChange={e => setForm({...form, guests: +e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}>
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
          </select>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Available Rooms</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {rooms?.length ? rooms.map(room => (
            <div key={room._id?.toString?.()} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{room.roomType} (Room #{room.roomNumber})</p>
              <p style={{ color: '#555', marginBottom: '8px' }}>Capacity: {room.capacity} guests | <span style={{ color: '#0066cc', fontWeight: 'bold' }}>₹{room.price}/night</span></p>
              <button
                onClick={() => handleBookRoom(room)}
                disabled={!room.available || bookingLoading}
                style={{ width: '100%', padding: '10px', backgroundColor: room.available ? '#0066cc' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: room.available ? 'pointer' : 'not-allowed' }}
              >
                {room.available ? (bookingLoading ? 'Booking...' : 'Book Now') : 'Not Available'}
              </button>
            </div>
          )) : <p>No rooms available</p>}
        </div>
      </div>
    </main>
  );
}
