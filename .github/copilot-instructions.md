# Hotel Booking Web App - Project Instructions

## Project Overview
A simple, user-friendly Next.js hotel booking web application with MongoDB integration.

## Features
- Beautiful landing page with hero section
- Grid display of available hotels with images and details
- Interactive booking modal with form validation
- Responsive design with modern gradient UI
- User-friendly error handling and loading states
- Simple one-click booking confirmation

## Tech Stack
- Next.js 14 with App Router
- React with TypeScript
- MongoDB with Mongoose
- Tailwind CSS

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page with hotel listings
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles
│   └── api/
│       └── hotels/
│           └── route.ts      # Hotels API endpoint
├── components/
│   └── HotelCard.tsx         # Hotel card with booking modal
├── models/
│   └── Hotel.ts              # MongoDB Hotel schema
└── lib/
    └── mongodb.ts            # Database connection
```

## Key Features

### Landing Page
- Eye-catching hero section with gradient background
- Hotel count display
- Responsive grid layout (1/2/3 columns)
- Beautiful loading spinner
- Error handling with retry option
- Footer section

### Hotel Cards
- Hotel image with hover effects
- Star rating badge
- Location with icon
- Description preview
- Amenities badges (max 3 shown)
- Price display with "per night" label
- "Book Now" button with gradient styling

### Booking Modal
- Clean, modern design
- Form fields: Name, Email, Check-in, Check-out, Guests
- Date validation (prevents past dates)
- Guest selection (1-6 people)
- Loading state during submission
- Success confirmation with friendly message

## Sample Data
6 hotels across US cities:
- Grand Palace Hotel (New York) - $250/night
- Sunset Beach Resort (Miami) - $180/night
- Mountain View Lodge (Denver) - $150/night
- Urban Boutique Hotel (San Francisco) - $220/night
- Lakeside Inn (Chicago) - $140/night
- Downtown Luxury Suites (Los Angeles) - $280/night

## Running the Application

Development server runs at: **http://localhost:3000**

### MongoDB Setup
**Option 1: Local MongoDB**
```bash
# Install from https://www.mongodb.com/try/download/community
# Runs automatically on mongodb://localhost:27017
```

**Option 2: MongoDB Atlas (Cloud)**
```bash
# 1. Create account at https://www.mongodb.com/cloud/atlas
# 2. Create cluster and get connection string
# 3. Update .env.local with connection string
```

### Start Development
```bash
npm run dev
```

## Design Philosophy
- **Simple**: One page, one purpose - book hotels quickly
- **Human**: Friendly language, emojis, and clear feedback
- **Beautiful**: Modern gradients, smooth animations, professional design
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Accessible**: Clear labels, proper form validation, keyboard navigation
