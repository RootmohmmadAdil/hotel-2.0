'use client';

import { useEffect, useState } from 'react';
import HotelCard from '@/components/HotelCard';
import { IHotel } from '@/models/Hotel';

export default function Home() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch('/api/hotels');
        const data = await response.json();
        if (data.success) {
          setHotels(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Your Hotel</h1>
      <a href="/admin" className="inline-block mb-6 px-4 py-2 bg-gray-700 text-white rounded">Admin</a>
      
      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id.toString()} hotel={hotel} />
          ))}
        </div>
      )}
    </main>
  );
}
