import React, { useState } from 'react';

interface Reservation {
  id: string;
  spaceName: string;
  category: string;
  location: string;
  dates: string;
  totalPaid: number;
  status: 'Instant Confirmed' | 'Escrow Held' | 'Completed';
  isHotel: boolean;
}

export default function GuestBookings() {
  // Sample guest bookings data
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'SF-HTL-98241',
      spaceName: 'Grand Palace Hotel & Suites',
      category: 'Hotel Bookings',
      location: 'Lagos, Nigeria',
      dates: 'Oct 20, 2026 - Oct 23, 2026',
      totalPaid: 330.00,
      status: 'Instant Confirmed',
      isHotel: true,
    },
    {
      id: 'SF-VEN-44120',
      spaceName: 'Modern Downtown Photo Studio',
      category: 'Photography & Film Studios',
      location: 'Dubai, UAE',
      dates: 'Oct 28, 2026 - Oct 29, 2026',
      totalPaid: 220.00,
      status: 'Escrow Held',
      isHotel: false,
    },
  ]);

  const [selectedVoucher, setSelectedVoucher] = useState<Reservation | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 font-sans">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reservations & Vouchers</h1>
        <p className="text-xs text-gray-500">Track your active stays, access instant hotel vouchers, and check escrow status.</p>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">You have no active reservations yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">{res.id}</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    res.status === 'Instant Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {res.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900">{res.spaceName}</h3>
                <p className="text-xs text-gray-500">{res.category} • {res.location}</p>
                <p className="text-xs font-medium text-blue-600">📅 {res.dates}</p>
              </div>

              <div className="flex flex-row sm:flex-col items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 gap-2">
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold">Total Paid</p>
                  <p className="text-lg font-black text-gray-900">${res.totalPaid.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setSelectedVoucher(res)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  View Digital Voucher 📄
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VOUCHER MODAL POPUP */}
      {selectedVoucher && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
              <div>
                <span className="bg-white text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                  {selectedVoucher.isHotel ? 'Instant Confirmed Hotel Voucher' : 'Space Booking Voucher'}
                </span>
                <h2 className="text-xl font-bold mt-1">{selectedVoucher.spaceName}</h2>
              </div>
              <button 
                onClick={() => setSelectedVoucher(null)}
                className="text-white hover:bg-blue-700 p-2 rounded-full text-lg font-bold w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-xl border flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Reservation Reference</p>
                  <p className="text-lg font-black font-mono text-gray-900">{selectedVoucher.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase">Amount Paid</p>
                  <p className="text-lg font-black text-green-600">${selectedVoucher.totalPaid.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <p><span className="font-semibold">Location:</span> {selectedVoucher.location}</p>
                <p><span className="font-semibold">Scheduled Dates:</span> {selectedVoucher.dates}</p>
                <p><span className="font-semibold">Type:</span> {selectedVoucher.category}</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
                {selectedVoucher.isHotel 
                  ? "⚡ This booking is instantly confirmed and paid. Present this voucher at the hotel front desk for immediate check-in."
                  : "🔒 Funds for this booking are securely held in escrow. Present upon check-in to release funds to the host."}
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl text-xs hover:bg-black transition"
              >
                Print / Save Voucher PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
