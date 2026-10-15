import React, { useState } from 'react';

// Helper logic for commission and escrow payouts
const isHotelCategory = (categoryName: string) => {
  return categoryName.toLowerCase().includes('hotel');
};

const processBookingPayment = (bookingData: { category: string; totalAmount: number }) => {
  const { category, totalAmount } = bookingData;
  const commissionRate = isHotelCategory(category) ? 0.15 : 0.12;
  const netPayout = totalAmount * (1 - commissionRate);

  if (isHotelCategory(category)) {
    return {
      status: 'Instant Confirmed & Paid Out',
      payoutAction: 'IMMEDIATE_DIRECT_TRANSFER',
      netPayout: netPayout,
      message: '⚡ Instant Booking: Direct payout issued to hotel management for immediate front-desk check-in.',
    };
  } else {
    return {
      status: 'Escrow Held',
      payoutAction: 'HOLD_IN_ESCROW',
      netPayout: netPayout,
      message: '🔒 Funds held securely in escrow until guest check-in verification.',
    };
  }
};

export default function HostDashboard() {
  const [listings, setListings] = useState([
    {
      id: 'h-1',
      title: 'Grand Palace Hotel Executive Suite',
      category: 'Hotel Bookings',
      pricePerDay: 110,
      status: 'Active',
    },
    {
      id: 'h-2',
      title: 'Modern Creative Photo & Film Studio',
      category: 'Photography & Film Studios',
      pricePerDay: 150,
      status: 'Active',
    },
  ]);

  const [earnings] = useState({
    totalEarned: 1245.00,
    pendingEscrow: 450.00,
    instantPaid: 795.00,
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Host Dashboard</h1>
          <p className="text-xs text-gray-500">Manage your spaces, view reservations, and track instant/escrow payouts.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
          + Add New Space
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total Earnings</p>
          <p className="text-2xl font-black text-gray-900 mt-1">${earnings.totalEarned.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-emerald-600 font-medium">⚡ Instant Hotel Payouts</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">${earnings.instantPaid.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-amber-600 font-medium">🔒 Escrow Held (Pending Verification)</p>
          <p className="text-2xl font-black text-amber-700 mt-1">${earnings.pendingEscrow.toFixed(2)}</p>
        </div>
      </div>

      {/* Active Listings Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Listed Spaces</h3>
        <div className="space-y-3">
          {listings.map((space) => (
            <div key={space.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{space.title}</h4>
                <p className="text-xs text-gray-500">{space.category} • ${space.pricePerDay} / day</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                {space.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
            }
              
