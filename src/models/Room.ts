import mongoose, { Schema, Document, Model } from 'mongoose';
export interface IRoom extends Document {
  hotelId: mongoose.Types.ObjectId; roomNumber: string; roomType: string;
  price: number; capacity: number; amenities?: string[]; available?: boolean;
}
const RoomSchema: Schema = new Schema({
  hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  available: { type: Boolean, default: true },
}, { timestamps: true });
const Room: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
export default Room;
