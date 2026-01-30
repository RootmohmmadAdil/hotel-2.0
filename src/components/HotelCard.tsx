export default function HotelCard({ hotel }: { hotel: any }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '15px', backgroundColor: '#f9f9f9' }}>
      <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
      <h3 style={{ margin: '8px 0' }}>{hotel.name}</h3>
      <p style={{ color: '#555', margin: '4px 0' }}>{hotel.city}</p>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066cc', margin: '8px 0' }}>₹{hotel.pricePerNight}/night</p>
    </div>
  );
}
