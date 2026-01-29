import mongoose, { Schema, Document, Model } from 'mongoose';
export interface IHotel extends Document {
  name: string; city: string; pricePerNight: number; image: string;
  description?: string; rating?: number; amenities?: string[];
}
const HotelSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  image: { type: String, required: true },
  description: String,
  rating: { type: Number, default: 4 },
  amenities: { type: [String], default: [] },
}, { timestamps: true });
const Hotel: Model<IHotel> = mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);
export default Hotel;
