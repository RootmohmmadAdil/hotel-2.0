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
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hotels</h1>
        <a href="/admin">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Admin Dashboard
          </button>
        </a>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id.toString()} hotel={hotel} />
          ))}
        </div>
      )}
    </main>
  );
}
