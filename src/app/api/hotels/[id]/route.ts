import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hotel from '@/models/Hotel';
import Room from '@/models/Room';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const hotelId = params.id;
    
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hotel ID' },
        { status: 400 }
      );
    }

    const hotel = await Hotel.findById(hotelId);
    
    if (!hotel) {
      return NextResponse.json(
        { success: false, error: 'Hotel not found' },
        { status: 404 }
      );
    }

    const rooms = await Room.find({ hotelId });

    return NextResponse.json({
      success: true,
      data: {
        hotel,
        rooms,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hotel details',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
