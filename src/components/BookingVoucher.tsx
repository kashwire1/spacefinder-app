import React from 'react';

interface BookingVoucherProps {
  reservationId: string;
  hotelName: string;
  roomType: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalPaid: number;
  currencySymbol?: string;
  hotelAddress: string;
  onPrintOrSave?: () => void;
}

export default function BookingVoucher({
  reservationId = 'SF-HTL-98241',
  hotelName = 'Grand Palace Hotel & Suites',
  roomType = 'Deluxe Executive Suite',
  guestName = 'Jerry Moses Urama',
  guestEmail = 'jerry@example.com',
  guestPhone = '+234 800 000 0000',
  checkInDate = 'Oct 20, 2026 (2:00 PM)',
  checkOutDate = 'Oct 23, 2026 (11:00 AM)',
  totalNights = 3,
  totalPaid = 330.00,
  currencySymbol = '$',
  hotelAddress = '12 Marina Road, Victoria Island, Lagos, Nigeria',
  onPrintOrSave,
}: BookingVoucherProps) {
  return (
    <div className="max-w-lg mx-auto p-4 font-sans">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-blue-600 p-6 text-white text-center relative">
          <div className="inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            Instant Confirmed Reservation
          </div>
          <h2 className="text-2xl font-black tracking-tight">SpaceFinder Voucher</h2>
          <p className="text-blue-100 text-xs mt-1">Present this digital voucher upon arrival at the front desk</p>
        </div>

        {/* Status Badge & Reservation ID */}
        <div className="p-6 border-b border-dashed border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Reservation ID</p>
            <p className="text-xl font-extrabold text-gray-900 tracking-widest">{reservationId}</p>
          </div>
          <div className="bg-green-100 border border-green-200 text-green-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
            <span>✓</span> Guaranteed & Paid
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 space-y-5 text-sm">
          {/* Hotel Info */}
          <div>
            <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Hotel Property</p>
            <p className="text-lg font-bold text-gray-900">{hotelName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{hotelAddress}</p>
            <p className="text-xs font-medium text-blue-600 mt-1">Room: {roomType}</p>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <div>
              <p className="text-xs uppercase text-gray-400 font-bold">Check-In</p>
              <p className="font-bold text-gray-800 text-xs mt-0.5">{checkInDate}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-400 font-bold">Check-Out</p>
              <p className="font-bold text-gray-800 text-xs mt-0.5">{checkOutDate}</p>
            </div>
          </div>

          {/* Guest Info */}
          <div className="border-t pt-4">
            <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Primary Guest Details</p>
            <div className="space-y-1 text-gray-700 text-xs">
              <p><span className="font-semibold text-gray-900">Guest Name:</span> {guestName}</p>
              <p><span className="font-semibold text-gray-900">Email:</span> {guestEmail}</p>
              <p><span className="font-semibold text-gray-900">Phone:</span> {guestPhone}</p>
              <p><span className="font-semibold text-gray-900">Duration:</span> {totalNights} Night(s)</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Total Amount Paid</p>
              <p className="text-xs text-green-600 font-semibold">Payment cleared via SpaceFinder Direct</p>
            </div>
            <p className="text-2xl font-black text-gray-900">
              {currencySymbol}{totalPaid.toFixed(2)}
            </p>
          </div>

          {/* Front Desk Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
            <strong>Notice to Hotel Management:</strong> Payment for this booking has been processed and disbursed in full by SpaceFinder. Please admit the primary guest upon presenting valid ID.
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-gray-50 border-t flex gap-3">
          <button
            onClick={() => window.print()}
            className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl text-sm hover:bg-black transition shadow-sm"
          >
            📄 Save / Print Voucher PDF
          </button>
        </div>

      </div>
    </div>
  );
          }
            
