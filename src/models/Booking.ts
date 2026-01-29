import mongoose, { Schema, Document, Model } from 'mongoose';
export interface IBooking extends Document {
  hotelName: string; userName: string; userEmail: string;
  checkInDate: string; checkOutDate: string; roomType: string;
  roomNumber: string; roomPrice: number; totalPrice: number; numberOfGuests: number;
}
const BookingSchema: Schema = new Schema({
  hotelName: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true },
  roomPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  numberOfGuests: { type: Number, required: true },
}, { timestamps: true });
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;
