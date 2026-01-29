import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hotel from '@/models/Hotel';
import Room from '@/models/Room';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }
    const hotel = await Hotel.findById(params.id);
    if (!hotel) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    const rooms = await Room.find({ hotelId: params.id });
    return NextResponse.json({ success: true, data: { hotel, rooms } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
