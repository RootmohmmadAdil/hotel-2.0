import HotelCard from '@/components/HotelCard';
import { HOTELS } from '../../lib/hotels';

export default function HotelsPage() {
  return (
    <div className="container">
      <h1 className="section-title">All hotels</h1>
      <p>Explore our curated stays across the country.</p>
      <div className="grid section-grid">
        {HOTELS.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
