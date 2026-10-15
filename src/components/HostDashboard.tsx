// Helper logic inside your Dashboard / Checkout component
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
