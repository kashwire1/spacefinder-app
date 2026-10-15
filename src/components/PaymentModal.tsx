import React from 'react';

interface PaymentModalProps {
  amount: number;
  email: string;
  guestName: string;
  spaceTitle: string;
  category: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export default function PaymentModal({
  amount,
  email,
  guestName,
  spaceTitle,
  category,
  onSuccess,
  onClose,
}: PaymentModalProps) {
  const isHotel = category.toLowerCase().includes('hotel');

  const handlePaystackPayment = () => {
    // @ts-ignore
    if (window.PaystackPop) {
      // @ts-ignore
      const handler = window.PaystackPop.setup({
        key: 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY',
        email: email,
        amount: Math.round(amount * 100),
        currency: 'NGN',
        ref: 'SF_' + Math.floor(Math.random() * 1000000000 + 1),
        callback: (response: any) => {
          onSuccess(response.reference);
        },
        onClose: () => {
          alert('Transaction was not completed.');
        },
      });
      handler.openIframe();
    } else {
      alert('Paystack SDK failed to load.');
    }
  };

  const handleFlutterwavePayment = () => {
    // @ts-ignore
    if (window.FlutterwaveCheckout) {
      // @ts-ignore
      window.FlutterwaveCheckout({
        public_key: 'FLWPUBK_TEST_YOUR_FLUTTERWAVE_KEY',
        tx_ref: 'FLW_SF_' + Date.now(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card, banktransfer, ussd',
        customer: { email, name: guestName },
        customizations: {
          title: 'SpaceFinder Booking',
          description: `Payment for ${spaceTitle}`,
        },
        callback: (data: any) => {
          if (data.status === 'successful') {
            onSuccess(data.transaction_id);
          }
        },
        onclose: () => {},
      });
    } else {
      alert('Flutterwave SDK failed to load.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative font-sans">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold">✕</button>

        <h3 className="text-xl font-bold text-gray-900 mb-1">Complete Your Payment</h3>
        <p className="text-xs text-gray-500 mb-4">{spaceTitle}</p>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
          <p className="text-xs text-blue-900 font-medium">Total Amount Due</p>
          <p className="text-2xl font-black text-blue-700">${amount.toFixed(2)}</p>
          <p className="text-[11px] text-blue-600 mt-1">
            {isHotel ? "⚡ Instant Hotel Booking: Confirmed immediately." : "🔒 Escrow Protected: Funds held until check-in."}
          </p>
        </div>

        <div className="space-y-3">
          <button onClick={handlePaystackPayment} className="w-full py-3.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition flex items-center justify-between text-sm">
            <span>Pay with Paystack</span>
            <span className="text-xs bg-emerald-800/40 px-2 py-0.5 rounded">Card / Transfer</span>
          </button>

          <button onClick={handleFlutterwavePayment} className="w-full py-3.5 px-4 bg-amber-500 text-gray-900 font-bold rounded-xl hover:bg-amber-600 transition flex items-center justify-between text-sm">
            <span>Pay with Flutterwave</span>
            <span className="text-xs bg-amber-700/20 px-2 py-0.5 rounded">Global Rails</span>
          </button>
        </div>
      </div>
    </div>
  );
          }
          
