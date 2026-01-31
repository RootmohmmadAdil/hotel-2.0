import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hotel Booking',
  description: 'Book hotels easily',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-content">
            <Link className="brand" href="/">Hotel Booking</Link>
            <nav className="nav">
              <Link href="/hotels">Hotels</Link>
              <Link href="/book">Book</Link>
              <Link href="/bookings">Bookings</Link>
            </nav>
          </div>
        </header>
        <main className="page">{children}</main>
        <footer className="site-footer">
          <div className="container footer-content">
            <p>© 2026 Hotel Booking. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
