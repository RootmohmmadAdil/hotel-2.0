import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRoom extends Document {
  hotelId: mongoose.Types.ObjectId;
  roomNumber: string;
  roomType: string;
  price: number;
  capacity: number;
  amenities: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Please provide hotel ID'],
    },
    roomNumber: {
      type: String,
      required: [true, 'Please provide room number'],
      trim: true,
    },
    roomType: {
      type: String,
      required: [true, 'Please provide room type'],
      enum: ['Single', 'Double', 'Deluxe', 'Suite'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide room price'],
      min: [0, 'Price cannot be negative'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide room capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room: Model<IRoom> =
  mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);

export default Room;
