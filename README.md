# Hotel Booking App

A simple and easy-to-use hotel booking application built with Next.js and React.

## Features

- Browse available hotels
- Book your stay with check-in and check-out dates
- View all your bookings
- Special requests option during booking
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RootmohmmadAdil/hotel-2.0.git
cd hotel-2.0
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── page.tsx      # Home page
│   ├── book/         # Booking page
│   ├── bookings/     # View bookings page
│   └── hotels/       # Hotels listing page
├── components/       # Reusable components
├── lib/              # Utility functions
└── models/           # Data models
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app is deployed on Vercel at:
**https://hotel-booking-gold-chi.vercel.app**

To deploy your own version:
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically deploy on every push

## License

Open source project. Feel free to use and modify.
