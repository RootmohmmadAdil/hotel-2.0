# 🏨 Hotel Booking App

A beautiful, user-friendly hotel booking web application built with Next.js and MongoDB.

## ✨ Features

- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 🏨 **Hotel Listings** - Browse amazing hotels with images and details
- 📱 **Responsive** - Works perfectly on mobile, tablet, and desktop
- 🚀 **One-Click Booking** - Simple booking modal with form validation
- 💝 **Human-Centric** - Friendly messages and clear feedback
- ⚡ **Fast & Lightweight** - Built with Next.js for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas)

### Installation

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   
   Create a `.env.local` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hotel-booking
   ```

   Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free):
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-booking
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

The app will automatically seed 6 sample hotels on first load! 🎉

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── api/
│       └── hotels/
│           └── route.ts      # Hotels API
├── components/
│   └── HotelCard.tsx         # Hotel card with booking modal
├── models/
│   └── Hotel.ts              # Hotel schema
└── lib/
    └── mongodb.ts            # Database connection
```

## 🎯 How It Works

1. **Browse Hotels** - See all available hotels with beautiful cards
2. **Click "Book Now"** - Opens a friendly booking modal
3. **Fill Details** - Enter your name, email, dates, and guest count
4. **Confirm Booking** - Get instant confirmation with a success message!

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **Hosting:** Vercel-ready

## 📦 Sample Hotels

The app includes 6 pre-configured hotels:
- Grand Palace Hotel (New York) - $250/night
- Sunset Beach Resort (Miami) - $180/night
- Mountain View Lodge (Denver) - $150/night
- Urban Boutique Hotel (San Francisco) - $220/night
- Lakeside Inn (Chicago) - $140/night
- Downtown Luxury Suites (Los Angeles) - $280/night

## 💡 Design Philosophy

- **Simple** - One page, one purpose - book hotels quickly
- **Human** - Friendly language, emojis, clear feedback
- **Beautiful** - Modern gradients, smooth animations
- **Accessible** - Clear labels, proper validation, keyboard navigation

## 📝 License

MIT

---

Made with ❤️ for travelers everywhere ✈️
