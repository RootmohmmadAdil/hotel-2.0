'use client';

import { useEffect, useState } from 'react';
import { Booking, getBookings } from '../../lib/bookingStorage';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <div className="container">
      <h1 className="section-title">Your bookings</h1>
      <p>Bookings made on this device will appear here.</p>

      {bookings.length === 0 ? (
        <div className="card card-spacing">
          <h3>No bookings yet</h3>
          <p>Start a new booking to see it listed here.</p>
        </div>
      ) : (
        <div className="grid section-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="card">
              <h3>{booking.hotel}</h3>
              <p>
                {booking.checkIn} to {booking.checkOut}
              </p>
              <p>
                {booking.name} · {booking.email}
              </p>
              {booking.requests ? <p>Requests: {booking.requests}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
