import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hotel from '@/models/Hotel';
import Room from '@/models/Room';

// Sample hotels data for initial seeding
const sampleHotels = [
  {
    name: 'adil',
    city: 'Sasaram, Bihar',
    pricePerNight: 3000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    rating: 4.8,
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
  },
  {
    name: 'yash',
    city: 'Sasaram, Bihar',
    pricePerNight: 4200,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    rating: 4.6,
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant'],
  },
  {
    name: 'ankush',
    city: 'Sasaram, Bihar',
    pricePerNight: 3800,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    rating: 4.7,
    amenities: ['WiFi', 'Fireplace', 'Hiking Trails', 'Restaurant'],
  },
  {
    name: 'mohammad',
    city: 'Sasaram, Bihar',
    pricePerNight: 4800,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    rating: 4.5,
    amenities: ['WiFi', 'Gym', 'Rooftop Bar', 'Parking'],
  },
  {
    name: 'zaid',
    city: 'Sasaram, Bihar',
    pricePerNight: 3200,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    rating: 4.4,
    amenities: ['WiFi', 'Lake View', 'Restaurant', 'Bar'],
  },
  {
    name: 'rahul',
    city: 'Sasaram, Bihar',
    pricePerNight: 4800,
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    rating: 4.9,
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Valet Parking'],
  },
];
// Sample rooms data for initial seeding
const generateSampleRooms = (hotelId: any) => [
  {
    hotelId,
    roomNumber: '101',
    roomType: 'Single',
    price: 800,
    capacity: 1,
    amenities: ['WiFi', 'AC', 'TV'],
    available: true,
  },
  {
    hotelId,
    roomNumber: '102',
    roomType: 'Double',
    price: 1200,
    capacity: 2,
    amenities: ['WiFi', 'AC', 'TV', 'Balcony'],
    available: true,
  },
  {
    hotelId,
    roomNumber: '103',
    roomType: 'Deluxe',
    price: 1800,
    capacity: 3,
    amenities: ['WiFi', 'AC', 'TV', 'Balcony', 'Jacuzzi'],
    available: true,
  },
  {
    hotelId,
    roomNumber: '104',
    roomType: 'Suite',
    price: 2500,
    capacity: 4,
    amenities: ['WiFi', 'AC', 'TV', 'Balcony', 'Jacuzzi', 'Kitchen'],
    available: false,
  },
];

export async function GET() {
  try {
    await dbConnect();
    const hotelCount = await Hotel.countDocuments();
    if (hotelCount === 0) {
      const createdHotels = await Hotel.insertMany(sampleHotels);
      for (const hotel of createdHotels) {
        await Room.insertMany(generateSampleRooms(hotel._id));
      }
    }
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      const hotels = await Hotel.find({});
      for (const hotel of hotels) {
        await Room.insertMany(generateSampleRooms(hotel._id));
      }
    }
    const hotels = await Hotel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: hotels });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch hotels' }, { status: 500 });
  }
}
