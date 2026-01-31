export type Booking = {
  id: number;
  name: string;
  email: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  requests?: string;
};

const STORAGE_KEY = 'hotelBookings';

const readStorage = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Booking[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStorage = (bookings: Booking[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const getBookings = (): Booking[] => readStorage();

export const addBooking = (booking: Omit<Booking, 'id'>): Booking => {
  const existing = readStorage();
  const newBooking: Booking = { ...booking, id: Date.now() };
  writeStorage([newBooking, ...existing]);
  return newBooking;
};
