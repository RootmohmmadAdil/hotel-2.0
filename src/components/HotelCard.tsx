import Link from 'next/link';

type Hotel = {
  _id: string;
  name: string;
  city: string;
  pricePerNight: number;
  image: string;
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="hotel-card">
      <img className="hotel-card__image" src={hotel.image} alt={hotel.name} />
      <div className="hotel-card__body">
        <h3 className="hotel-card__title">{hotel.name}</h3>
        <p className="hotel-card__city">{hotel.city}</p>
        <p className="hotel-card__price">₹{hotel.pricePerNight}/night</p>
        <Link className="button button-small" href={`/book?hotel=${encodeURIComponent(hotel.name)}`}>
          Book now
        </Link>
      </div>
    </div>
  );
}
