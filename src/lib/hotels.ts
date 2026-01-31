export type Hotel = {
  _id: string;
  name: string;
  city: string;
  pricePerNight: number;
  image: string;
};

export const HOTELS: Hotel[] = [
  {
    _id: '1',
    name: 'Taj Palace',
    city: 'Mumbai',
    pricePerNight: 250,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
  },
  {
    _id: '2',
    name: 'Maharaja Resort',
    city: 'Goa',
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',
  },
  {
    _id: '3',
    name: 'Ashoka Heritage',
    city: 'Delhi',
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80',
  },
];
