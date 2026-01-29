'use client';

import { useEffect, useState } from 'react';
import HotelCard from '@/components/HotelCard';
import { IHotel } from '@/models/Hotel';

// Fallback dummy data
const DUMMY_HOTELS = [
  {
    _id: '1',
    name: 'Grand Hotel',
    city: 'New York',
    pricePerNight: 250,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    rating: 4.8,
    amenities: ['WiFi', 'Pool', 'Gym'],
  },
  {
    _id: '2',
    name: 'Sunset Resort',
    city: 'Miami',
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    rating: 4.6,
    amenities: ['WiFi', 'Beach', 'Pool'],
  },
  {
    _id: '3',
    name: 'Mountain Lodge',
    city: 'Denver',
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    rating: 4.7,
    amenities: ['WiFi', 'Hiking', 'Restaurant'],
  },
  {
    _id: '4',
    name: 'Urban Boutique',
    city: 'San Francisco',
    pricePerNight: 220,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    rating: 4.5,
    amenities: ['WiFi', 'Gym', 'Bar'],
  },
  {
    _id: '5',
    name: 'Lakeside Inn',
    city: 'Chicago',
    pricePerNight: 140,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    rating: 4.4,
    amenities: ['WiFi', 'Lake View', 'Restaurant'],
  },
  {
    _id: '6',
    name: 'Luxury Suites',
    city: 'Los Angeles',
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    rating: 4.9,
    amenities: ['WiFi', 'Pool', 'Spa'],
  },
];

export default function Home() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHotels() {
      try {
        console.log('Fetching hotels...');
        const response = await fetch('/api/hotels', { cache: 'no-store' });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success && data.data) {
          setHotels(data.data);
        } else {
          setError(data.error || 'Failed to fetch hotels');
          setHotels(DUMMY_HOTELS as any);
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err?.message || 'Connection error');
        setHotels(DUMMY_HOTELS as any);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Book Your Hotel</h1>
      <a href="/admin" style={{ display: 'inline-block', marginBottom: '15px', padding: '10px 15px', backgroundColor: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Admin Dashboard</a>
      
      {error && (
        <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', color: '#856404' }}>
          <strong>Note:</strong> {error} - Showing demo hotels
        </div>
      )}

      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <>
          <p style={{ color: '#666', marginBottom: '15px' }}>Found {hotels.length} hotels</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {hotels.map((hotel: any) => (
              <HotelCard key={hotel._id?.toString?.() || hotel._id} hotel={hotel} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
