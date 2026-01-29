import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  hotelName: string;
  userName: string;
  userEmail: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  roomNumber: string;
  roomPrice: number;
  totalPrice: number;
  numberOfGuests: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    hotelName: {
      type: String,
      required: [true, 'Please provide hotel name'],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, 'Please provide user name'],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
      lowercase: true,
    },
    checkInDate: {
      type: String,
      required: [true, 'Please provide check-in date'],
    },
    checkOutDate: {
      type: String,
      required: [true, 'Please provide check-out date'],
    },
    roomType: {
      type: String,
      required: [true, 'Please provide room type'],
    },
    roomNumber: {
      type: String,
      required: [true, 'Please provide room number'],
    },
    roomPrice: {
      type: Number,
      required: [true, 'Please provide room price'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide total price'],
    },
    numberOfGuests: {
      type: Number,
      required: [true, 'Please provide number of guests'],
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
