import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHotel extends Document {
  name: string;
  city: string;
  pricePerNight: number;
  image: string;
  description?: string;
  rating?: number;
  amenities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide hotel name'],
      trim: true,
      maxlength: [100, 'Hotel name cannot be more than 100 characters'],
    },
    city: {
      type: String,
      required: [true, 'Please provide city name'],
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Please provide price per night'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Please provide hotel image URL'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 4.0,
    },
    amenities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Hotel: Model<IHotel> = mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema);

export default Hotel;
