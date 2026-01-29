'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IHotel } from '@/models/Hotel';

export default function HotelCard({ hotel }: { hotel: IHotel }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 w-full">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">{hotel.name}</h2>
          {hotel.rating && <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">⭐ {hotel.rating}</span>}
        </div>
        
        <p className="text-gray-600 mb-2">📍 {hotel.city}</p>
        {hotel.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>}
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-500">Per Night</p>
            <p className="text-3xl font-bold text-blue-600">₹{hotel.pricePerNight}</p>
          </div>
          
          <Link href={`/hotels/${hotel._id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
              View Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
