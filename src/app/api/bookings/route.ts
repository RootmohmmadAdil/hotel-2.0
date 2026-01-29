import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['hotelName', 'userName', 'userEmail', 'checkInDate', 'checkOutDate', 'roomType', 'roomNumber', 'roomPrice', 'numberOfGuests'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.userEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Calculate nights and total price
    const checkIn = new Date(body.checkInDate);
    const checkOut = new Date(body.checkOutDate);
    
    if (checkOut <= checkIn) {
      return NextResponse.json(
        { success: false, error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = body.roomPrice * nights;

    // Create booking
    const booking = await Booking.create({
      ...body,
      totalPrice,
      numberOfGuests: parseInt(body.numberOfGuests),
      roomPrice: parseFloat(body.roomPrice),
    });

    return NextResponse.json({ success: true, data: booking, message: 'Booking confirmed successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}
