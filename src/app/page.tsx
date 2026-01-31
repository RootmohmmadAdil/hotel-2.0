import Link from 'next/link';
import HotelCard from '@/components/HotelCard';
import { HOTELS } from '../lib/hotels';

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <span className="badge">New for 2026</span>
          <h1>Plan your stay with confidence.</h1>
          <p>
            Discover curated hotels across India, compare prices instantly, and book in minutes. Every page
            is designed to look great on any device.
          </p>
        </div>
        <div className="cta-group">
          <Link className="button" href="/hotels">Browse Hotels</Link>
          <Link className="button secondary" href="/book">Start Booking</Link>
        </div>
      </section>

      <h2 className="section-title">Popular stays</h2>
      <div className="grid">
        {HOTELS.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>

      <h2 className="section-title">Why book with us</h2>
      <div className="grid">
        <div className="card">
          <h3>Verified listings</h3>
          <p>Only top-rated hotels with photos, amenities, and honest reviews.</p>
        </div>
        <div className="card">
          <h3>Fast checkout</h3>
          <p>Book a room in under two minutes with instant confirmation.</p>
        </div>
        <div className="card">
          <h3>Responsive support</h3>
          <p>We are here 24/7 to help you adjust or cancel plans easily.</p>
        </div>
      </div>
    </div>
  );
}
