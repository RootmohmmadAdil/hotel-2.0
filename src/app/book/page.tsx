'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { HOTELS } from '../../lib/hotels';
import { addBooking } from '../../lib/bookingStorage';

function BookingForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    hotel: '',
    checkIn: '',
    checkOut: '',
    requests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hotelParam = searchParams.get('hotel');
    if (hotelParam) {
      setForm((prev) => ({ ...prev, hotel: hotelParam }));
    }
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.hotel || !form.checkIn || !form.checkOut) {
      alert('Please fill all required fields.');
      return;
    }
    addBooking({
      name: form.name,
      email: form.email,
      hotel: form.hotel,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      requests: form.requests,
    });
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1 className="section-title">Book your stay</h1>
      <p>Complete the form below and we will confirm your booking instantly.</p>

      <form className="form section-grid" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
        <select name="hotel" value={form.hotel} onChange={handleChange} required>
          <option value="">Select hotel</option>
          {HOTELS.map((hotel) => (
            <option key={hotel._id} value={hotel.name}>
              {hotel.name} - {hotel.city}
            </option>
          ))}
        </select>
        <div className="grid date-grid">
          <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required />
          <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required />
        </div>
        <textarea name="requests" placeholder="Special requests" value={form.requests} onChange={handleChange} />
        <button className="button" type="submit">Confirm booking</button>
      </form>

      {submitted && (
        <div className="card card-spacing">
          <h3>Booking received</h3>
          <p>
            Thank you {form.name}. We have reserved {form.hotel} from {form.checkIn} to {form.checkOut}.
          </p>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
      <BookingForm />
    </Suspense>
  );
}
