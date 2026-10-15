// SpaceFinder Live App Entry

import React, { useState } from 'react';

// Import all SpaceFinder Components
import LocationFilter from './components/LocationFilter';
import HostDashboard from './components/HostDashboard';
import HostSettings from './components/HostSettings';
import GuestBookings from './components/GuestBookings';
import BookingCheckout from './components/BookingCheckout';
import PaymentModal from './components/PaymentModal';
import BookingVoucher from './components/BookingVoucher';
import AuthModal from './components/AuthModal';

// Sample mock listings data
const mockListings = [
  {
    id: 'sp-1',
    title: 'Grand Palace Hotel Executive Suite',
    category: 'Hotel Bookings',
    pricePerDay: 110,
    city: 'Lagos',
    country: 'Nigeria',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sp-2',
    title: 'Modern Creative Photo & Film Studio',
    category: 'Photography & Film Studios',
    pricePerDay: 150,
    city: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sp-3',
    title: 'Luxury Oceanfront Villa & Gardens',
    category: 'Villas & Luxury Mansions',
    pricePerDay: 450,
    city: 'Accra',
    country: 'Ghana',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  },
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'browse' | 'guest-bookings' | 'host-dashboard' | 'host-settings'>('browse');
  
  // Search & Filter State
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Modals & Flows
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedListingForCheckout, setSelectedListingForCheckout] = useState<any | null>(null);
  const [activePaymentModal, setActivePaymentModal] = useState<any | null>(null);
  const [generatedVoucher, setGeneratedVoucher] = useState<any | null>(null);

  // Handle Payment Completion
  const handlePaymentSuccess = (transactionRef: string) => {
    const isHotel = activePaymentModal.category.toLowerCase().includes('hotel');
    
    // Set digital voucher details
    setGeneratedVoucher({
      reservationId: 'SF-' + transactionRef.slice(-6).toUpperCase(),
      hotelName: activePaymentModal.spaceTitle,
      roomType: 'Standard Reserved Suite',
      guestName: 'Jerry Moses Urama',
      guestEmail: 'jerry@example.com',
      guestPhone: '+234 800 000 0000',
      checkInDate: 'Oct 20, 2026 (2:00 PM)',
      checkOutDate: 'Oct 23, 2026 (11:00 AM)',
      totalNights: 3,
      totalPaid: activePaymentModal.amount,
      currencySymbol: '$',
      hotelAddress: '12 Central Boulevard, City Center',
    });

    setActivePaymentModal(null);
    setSelectedListingForCheckout(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* GLOBAL NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('browse')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-blue-600 text-white font-black text-xl p-2 rounded-xl">SF</div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">SpaceFinder</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <button
              onClick={() => setActiveTab('browse')}
              className={activeTab === 'browse' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}
            >
              Browse Spaces
            </button>
            <button
              onClick={() => setActiveTab('guest-bookings')}
              className={activeTab === 'guest-bookings' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('host-dashboard')}
              className={activeTab === 'host-dashboard' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}
            >
              Host Portal
            </button>
            <button
              onClick={() => setActiveTab('host-settings')}
              className={activeTab === 'host-settings' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}
            >
              Payout Settings
            </button>
          </nav>

          {/* Auth Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Sign In / Register
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex justify-around border-t py-2 bg-white text-xs font-semibold text-gray-600">
          <button onClick={() => setActiveTab('browse')} className={activeTab === 'browse' ? 'text-blue-600' : ''}>Browse</button>
          <button onClick={() => setActiveTab('guest-bookings')} className={activeTab === 'guest-bookings' ? 'text-blue-600' : ''}>Bookings</button>
          <button onClick={() => setActiveTab('host-dashboard')} className={activeTab === 'host-dashboard' ? 'text-blue-600' : ''}>Host</button>
          <button onClick={() => setActiveTab('host-settings')} className={activeTab === 'host-settings' ? 'text-blue-600' : ''}>Settings</button>
        </div>
      </header>

      {/* MAIN CONTENT ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* VIEW 1: BROWSE SPACES & HOTELS */}
        {activeTab === 'browse' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black text-gray-900">Find & Reserve Verified Spaces Worldwide</h1>
              <p className="text-xs text-gray-500">Explore 22 categories with instant hotel entry and escrow-protected venue bookings.</p>
            </div>

            {/* Location & Category Filter Bar */}
            <LocationFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />

            {/* Space Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {mockListings.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                      <span>{item.category}</span>
                      <span className="font-bold text-amber-500">★ {item.rating}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-4">📍 {item.city}, {item.country}</p>
                    
                    <div className="flex justify-between items-center border-t pt-3">
                      <div>
                        <span className="text-lg font-black text-gray-900">${item.pricePerDay}</span>
                        <span className="text-xs text-gray-400"> / day</span>
                      </div>
                      <button
                        onClick={() => setSelectedListingForCheckout(item)}
                        className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
                      >
                        Reserve Space
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: GUEST RESERVATIONS HISTORY */}
        {activeTab === 'guest-bookings' && <GuestBookings />}

        {/* VIEW 3: HOST DASHBOARD */}
        {activeTab === 'host-dashboard' && <HostDashboard />}

        {/* VIEW 4: HOST PAYOUT SETTINGS */}
        {activeTab === 'host-settings' && <HostSettings />}

      </main>

      {/* CHECKOUT MODAL FLOW */}
      {selectedListingForCheckout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setSelectedListingForCheckout(null)} 
              className="absolute top-4 right-4 text-gray-400 font-bold"
            >
              ✕
            </button>
            <BookingCheckout 
              spaceTitle={selectedListingForCheckout.title}
              rentalDurationDays={3}
              pricePerDay={selectedListingForCheckout.pricePerDay}
              onProceedToPayment={() => {
                setActivePaymentModal({
                  spaceTitle: selectedListingForCheckout.title,
                  category: selectedListingForCheckout.category,
                  amount: selectedListingForCheckout.pricePerDay * 3,
                });
              }}
            />
          </div>
        </div>
      )}

      {/* PAYMENT GATEWAY MODAL (PAYSTACK / FLUTTERWAVE) */}
      {activePaymentModal && (
        <PaymentModal
          amount={activePaymentModal.amount}
          email="jerry@example.com"
          guestName="Jerry Moses Urama"
          spaceTitle={activePaymentModal.spaceTitle}
          category={activePaymentModal.category}
          onSuccess={handlePaymentSuccess}
          onClose={() => setActivePaymentModal(null)}
        />
      )}

      {/* GENERATED DIGITAL VOUCHER POPUP */}
      {generatedVoucher && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="max-w-lg w-full relative">
            <button 
              onClick={() => setGeneratedVoucher(null)} 
              className="absolute -top-10 right-0 text-white text-2xl font-bold"
            >
              ✕ Close
            </button>
            <BookingVoucher {...generatedVoucher} />
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </div>
  );
}
// build-refresh-1015
