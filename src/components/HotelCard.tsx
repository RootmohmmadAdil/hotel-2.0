'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IHotel } from '@/models/Hotel';

export default function HotelCard({ hotel }: { hotel: IHotel }) {
  return (
    <div className="border border-gray-300 p-4 rounded">
      <div className="relative h-48 w-full mb-3">
        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
      </div>
      
      <h2 className="text-xl font-bold mb-1">{hotel.name}</h2>
      <p className="text-gray-700 mb-1">City: {hotel.city}</p>
      {hotel.rating && <p className="text-gray-700 mb-2">Rating: {hotel.rating}/5</p>}
      {hotel.description && <p className="text-gray-600 text-sm mb-3">{hotel.description}</p>}
      
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">₹{hotel.pricePerNight}/night</p>
        <Link href={`/hotels/${hotel._id}`}>
          <button className="bg-gray-700 text-white px-4 py-2 rounded">View Rooms</button>
        </Link>
      </div>
    </div>
  );
}
