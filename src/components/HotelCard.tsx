'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IHotel } from '@/models/Hotel';

export default function HotelCard({ hotel }: { hotel: IHotel }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '15px', backgroundColor: '#fff' }}>
      <div style={{ position: 'relative', height: '200px', width: '100%', marginBottom: '10px', borderRadius: '4px', overflow: 'hidden' }}>
        <Image src={hotel.image} alt={hotel.name} fill style={{ objectFit: 'cover' }} />
      </div>
      
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{hotel.name}</h2>
      <p style={{ color: '#555', marginBottom: '5px' }}>{hotel.city}</p>
      {hotel.rating && <p style={{ color: '#0066cc', fontWeight: 'bold', marginBottom: '8px' }}>Rating: {hotel.rating}/5</p>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#0066cc' }}>₹{hotel.pricePerNight}/night</p>
        <Link href={`/hotels/${hotel._id}`}>
          <button style={{ padding: '8px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View Rooms</button>
        </Link>
      </div>
    </div>
  );
}
